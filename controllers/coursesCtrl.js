const Courses = require("../models/courseModel");
const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

const DATA_PER_PAGE = 12;

class QueryFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;

    this.query = this.query
      .skip(DATA_PER_PAGE * (page - 1))
      .limit(DATA_PER_PAGE);

    return this;
  }

  filteringPlatform() {
    const platform = this.queryString.platform;

    if (platform.inflearn && !platform.fastcampus)
      this.query = this.query.find({ platform: "inflearn" });
    else if (!platform.inflearn && platform.fastcampus)
      this.query = this.query.find({ platform: "fastcampus" });
    else this.query = this.query.find();

    return this;
  }
}

const coursesCtrl = {
  scrapingInflearnCourses: async (req, res) => {
    const { order, pageFrom, pageTo, search } = req.body;

    const getHtml = async (order, page) => {
      try {
        return await axios.get(
          `https://www.inflearn.com/courses?s=${encodeURI(
            search
          )}&order=${encodeURI(order)}&page=${page}`
        );
      } catch (err) {
        return res.status(500).json({ err: err.message });
      }
    };

    const inflearnScraping = async (order, page) => {
      try {
        const html = await getHtml(order, page);
        const $ = cheerio.load(html.data);
        const $courseList = $(".course_card_item");

        let scrapingCourses = [];

        $courseList.each((i, node) => {
          const BASE_URL = "https://www.inflearn.com";
          const slicePrice = $(node).find(".price").text();
          const price = slicePrice.substring(
            slicePrice.indexOf("₩"),
            `${
              slicePrice.lastIndexOf("₩") === slicePrice.indexOf("₩")
                ? slicePrice.length
                : slicePrice.lastIndexOf("₩")
            }`
          );

          scrapingCourses.push({
            title: $(node).find(".card-content .course_title").text(),
            instructor: $(node).find(".instructor").text(),
            description: $(node).find(".course_description").text(),
            image: $(node).find(".card-image > figure > img").attr("src"),
            price,
            url: BASE_URL + $(node).find(".course_card_front").attr("href"),
            platform: "inflearn",
          });
        });

        return scrapingCourses;
      } catch (err) {
        return res.status(500).json({ err: err.messsage });
      }
    };

    const scrapingLoop = async (order, pageFrom, pageTo) => {
      try {
        const courses = [];

        for (let i = pageFrom; i <= pageTo; i++) {
          const coursesArr = await inflearnScraping(order, [i]);
          courses.push(...coursesArr);
        }

        return courses;
      } catch (err) {
        return res.status(500).json({ err: err.messsage });
      }
    };

    const inflearnCourses = await scrapingLoop(order, pageFrom, pageTo);

    res.json({
      inflearnCourses,
      msg: `${inflearnCourses.length}개의 인프런 강좌 데이터 스크래핑 성공.`,
    });
  },
  scrapingFastcampusCourses: async (req, res) => {
    const { category } = req.body;

    const fastcampusScraping = async (category) => {
      const url = `https://fastcampus.co.kr/${category}`;

      const browser = await puppeteer.launch();

      const page = await browser.newPage();
      await page.goto(url);

      const html = await page.content();
      const $ = cheerio.load(html);
      const $courseList = $(".card__container");

      let courses = [];

      $courseList.each((i, node) => {
        const BASE_URL = "https://fastcampus.co.kr";
        const urlRegex = (data) => {
          const re =
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣0-9()@:%_\+.~#?&//=]*)/gi;
          const urlData = data.match(re);

          return urlData;
        };

        const title = $(node).find(".card__title").text();
        const description = $(node).find(".card__content").text();
        const img = $(node).find(".card__image").css("background-image");
        const imgUrl = urlRegex(img);
        // const url = BASE_URL + $(node).find(".card__container").attr("href");
        const url = BASE_URL;

        courses.push({
          title,
          description,
          image: imgUrl[0],
          url,
          platform: "fastcampus",
        });
      });

      return courses;
    };

    const fastcampusCourses = await fastcampusScraping(category);

    res.json({
      fastcampusCourses,
      msg: `${fastcampusCourses.length}개의 패스트캠퍼스 강좌 데이터 스크래핑 성공.`,
    });
  },
  saveCourses: async (req, res) => {
    try {
      const { data } = req.body;

      const filteringData = async (data) => {
        let filter = [];

        const findData = async (item) => {
          const existData = await Courses.findOne({
            title: item.title,
            platform: item.platform,
          });

          return existData;
        };

        for (const item of data) {
          const filteringObj = await findData(item);
          if (!filteringObj) filter.push(item);
        }

        return filter;
      };

      const savingData = async (data) => {
        let savedData = [];

        for (const saveObj of data) {
          const {
            title,
            instructor,
            description,
            image,
            price,
            sale_price,
            url,
            platform,
          } = saveObj;

          const newCourses = new Courses({
            title,
            instructor,
            description,
            image,
            price,
            sale_price,
            url,
            platform,
          });

          await newCourses.save();

          savedData.push(newCourses);
        }

        return savedData;
      };

      const saveData = (filteredData) => savingData(filteredData);

      const filteredData = await filteringData(data);
      const savedData = await saveData(filteredData);

      res.json({
        savedData,
        msg: `${savedData.length}개의 데이터 저장이 성공하였습니다.`,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getCourses: async (req, res) => {
    try {
      req.query = { ...req.query, platform: JSON.parse(req.query.platform) };

      let totalPage;

      if (req.query.platform.inflearn && !req.query.platform.fastcampus) {
        totalPage = await Courses.countDocuments({
          platform: "inflearn",
        });
      } else if (
        !req.query.platform.inflearn &&
        req.query.platform.fastcampus
      ) {
        totalPage = await Courses.countDocuments({
          platform: "fastcampus",
        });
      } else {
        totalPage = await Courses.countDocuments();
      }

      const queryResult = new QueryFeatures(Courses.find(), req.query)
        .paginating()
        .filteringPlatform();

      const courses = await queryResult.query
        .sort("-createdAt")
        .populate("review")
        .populate({
          path: "review",
          populate: {
            path: "owner likes",
            select: "-password",
          },
        });

      res.json({
        msg: "데이터 불러오기 성공.",
        courses,
        totalPage: Math.ceil(totalPage / DATA_PER_PAGE),
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getCourse: async (req, res) => {
    try {
      const { id } = req.params;

      const course = await Courses.findById(id)
        .populate("review")
        .populate({
          path: "review",
          populate: {
            path: "owner likes",
            select: "-password",
          },
        });

      res.json({
        msg: "데이터 찾기 성공.",
        course,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  searchCourse: async (req, res) => {
    try {
      const searchCourses = await Courses.find({
        title: { $regex: req.query.title, $options: "i" },
      });

      if (searchCourses.length === 0)
        return res.json({
          msg: "찾으시는 강의가 존재하지 않습니다.",
          searchCourses: null,
        });

      res.json({
        msg: `${searchCourses.length}개의 강의 검색 성공`,
        searchCourses,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getMostReviewCourses: async (req, res) => {
    await Courses.aggregate([
      { $unwind: "$review" },
      {
        $group: {
          _id: "$_id",
          length: { $sum: 1 },
        },
      },
      { $sort: { length: -1 } },
    ]).exec(async (err, docs) => {
      if (err) return res.status(500).json({ msg: err.message });

      let courses = [];

      for (const course of docs) {
        const res = await Courses.findById(course._id);
        courses.push(res);
      }

      res.json({
        msg: "데이터 불러오기 성공.",
        courses,
      });
    });
  },
  getRecentReviewCourses: async (req, res) => {
    try {
      let courses = [];

      const coursesRes = await Courses.find().sort("-review").limit(15);

      for (const course of coursesRes) {
        if (course.review.length === 0) continue;
        courses.push(course);
      }

      res.json({
        msg: "데이터 불러오기 성공.",
        courses,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getRecentAddCourses: async (req, res) => {
    try {
      const courses = await Courses.find()
        .sort("-createdAt")
        .limit(15)
        .populate("review")
        .populate({
          path: "review",
          populate: {
            path: "owner likes",
            select: "-password",
          },
        });

      res.json({
        msg: "데이터 불러오기 성공.",
        courses,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = coursesCtrl;

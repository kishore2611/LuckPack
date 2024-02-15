var qs = require("qs");

class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search(){
      const keyword = this.queryStr.keyword ? {"residence.residence_address": {
          $regex: this.queryStr.keyword,
          $options: 'i'
      }} : {};

      console.log(keyword);
      this.query = this.query.find({ ...keyword });
      return this;
  }

//   filter(){
//     const queryCopy = { ...this.queryStr }
//     // console.log(queryCopy);

//     //REMOVE SOME FIELD FOR CATEGORY
//     const removefield = ["keyword", "page", "limit"]

//     removefield.forEach(key => delete queryCopy[key])

//     //Filter for Price and rating
//     // console.log(queryCopy);

//     let queryStr = JSON.stringify(queryCopy);
//     queryStr = queryStr.replace(/\b(gt || gte || lt || lte)\b/g, (key => `$${key}`));
//     queryStr = queryStr.replace(/&$/);

//     this.query = this.query.find(JSON.parse(queryStr))

//     console.log(queryStr);
//     return this;
// }

  filter() {
    // console.log(qs.stringify({ a: 1, b: "" }));
    const queryCopy = {  ...this.queryStr };
    
    // if (queryCopy.name === "") {
    //   console.log("empty");
    // }
    let params = new URLSearchParams (queryCopy);
    let keysForDel = [];
    params.forEach((value, k) => {
      console.log("value", value);
      console.log("queryCopy", queryCopy);
      console.log("k", k);


      if (value == '' ) {
        keysForDel.push(k);
      }
      // else if (queryCopy.isActive.gt == '' || queryCopy.isActive.lt == '' ){
      //   keysForDel.push(queryCopy.isActive);
      // }
      //   keysForDel.push(queryCopy.isActive);
      // }
      // else if(queryCopy.isActive.lt == ''){
      });
      // console.log("sahdksajhd", k);
    keysForDel.forEach((k) => {
      params.delete(k);
    });
    // console.log("____________________________>",params);
    // console.log("---------------------------->",params.toString());
    console.log("============================>", keysForDel);
    // let params = new URLSearchParams(queryCopy);
    // params.forEach((value, key) => {
    //   // never reaches `c`
    //   console.log(key, " => ", value);
    //   if (value === '') params.delete(key);
    // });
    // console.log(params.toString());
    //REMOVE SOME FIELD FOR CATEGORY
    // const removefield = ["keyword", "page", "limit", keysForDel];
    // removefield.forEach((key) => delete queryCopy[key]);
    const removefield = ["keyword", "page", "limit"];
    for (let i = 0; i < keysForDel.length; i++) {
      removefield.push(keysForDel[i]);
    }
    removefield.forEach((key) => delete queryCopy[key]);
    //Filter for Price and rating
    // console.log(queryCopy);
    console.log("query2", removefield)
    let queryStr = JSON.stringify(queryCopy);
    const regex = /\b(gt|gte|lt|lte|in)\b/g;
    const REGEXP = /^$/;
    // const regex2 = /[^=&]+=(&|$)/g;
    // const REGEXP2 = /&$/;
    // const EMPTY = /^(?!\s*$).+/;
    // console.log(regex);
    // const url = ``/user?${qs.stringify({ name, age })}``.replace(/[^=&]+=(&|$)/g,"").replace(/&$/,"")
    queryStr = queryStr.replace(regex, (key) => `$${key}`);
    queryStr = queryStr.replace(REGEXP);
    // console.log("hjhghftyfh", queryStr);
    // queryStr = queryStr.replace(regex2, "");
    // queryStr = queryStr.replace(REGEXP2, "");
    // queryStr = queryStr.replace(EMPTY);
    this.query = this.query.find(JSON.parse(queryStr));
    // console.log(this, "this");
    return this;
  }

  pagination(resultPerPage){

      const currentPage = Number(this.queryStr.page) || 1;

      const skip = resultPerPage * (currentPage - 1);

      this.query = this.query.limit(resultPerPage).skip(skip);

      return this;
  }
}

module.exports = ApiFeatures;

class APIFeature {
  query: any;
  queryString: any;
  constructor(query: any, queryString: any) {
    this.query = query; // query in mongooose
    this.queryString = queryString; // query object from req.query
  }
  filter = () => {
    const queryObj = { ...this.queryString };
    const excludeFields = ["page", "sort", "fields", "per_pages", "q"];
    excludeFields.forEach((field) => delete queryObj[field]);
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(/(gte|gt|eq|lt|lte)/g, (match) => `$${match}`);
    //{gt: 3} --> {$gt: 3}
    this.query = this.query.find(JSON.parse(queryString));
    return this;
  };
  search = () => {
    if (this.queryString.q) {
      this.query = this.query.find({ name: { $regex: this.queryString.q, $options: "i" } });
    }
    return this;
  };
  fields = () => {
    if (this.queryString.fields) {
      // { fields: '-name,-description' } to ['-name','desciption']
      const queryString = this.queryString.fields.split(",");
      this.query = this.query.select(queryString);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  };
  sort = () => {
    if (this.queryString.sort) {
      // {sort: "-like,view"} to queryString { like: -1, view: 1 }
      const queryString: any = {};
      this.queryString.sort.split(",").forEach((field: string) => {
        if (field.startsWith("-")) {
          queryString[field.slice(1, field.length)] = -1;
        } else {
          queryString[field] = 1;
        }
      });
      this.query = this.query.sort(queryString);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  };
  paginate = () => {
    // page1 limit 5
    // 1-5
    // page4 limit 5
    // 15-20
    // if don't have per_pages default is 10;
    const numOfLimit: number = this.queryString.per_pages ? this.queryString.per_pages * 1 : 10;
    // if dont' have page default page: 1 -> skip 0;
    const numOfSkip: number = this.queryString.page ? (this.queryString.page - 1) * numOfLimit : 0;
    this.query = this.query.skip(numOfSkip).limit(numOfLimit);
    return this;
  };
}
export default APIFeature;

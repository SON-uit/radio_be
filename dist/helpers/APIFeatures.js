"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class APIFeature {
    constructor(query, queryString) {
        this.filter = () => {
            const queryObj = Object.assign({}, this.queryString);
            const excludeFields = ["page", "sort", "fields", "per_pages", "q"];
            excludeFields.forEach((field) => delete queryObj[field]);
            let queryString = JSON.stringify(queryObj);
            queryString = queryString.replace(/(gte|gt|eq|lt|lte)/g, (match) => `$${match}`);
            //{gt: 3} --> {$gt: 3}
            this.query = this.query.find(JSON.parse(queryString));
            return this;
        };
        this.search = () => {
            if (this.queryString.q) {
                this.query = this.query.find({ name: { $regex: this.queryString.q, $options: "i" } });
            }
            return this;
        };
        this.fields = () => {
            if (this.queryString.fields) {
                // { fields: '-name,-description' } to ['-name','desciption']
                const queryString = this.queryString.fields.split(",");
                this.query = this.query.select(queryString);
            }
            else {
                this.query = this.query.select("-__v");
            }
            return this;
        };
        this.sort = () => {
            if (this.queryString.sort) {
                // {sort: "-like,view"} to queryString { like: -1, view: 1 }
                const queryString = {};
                this.queryString.sort.split(",").forEach((field) => {
                    if (field.startsWith("-")) {
                        queryString[field.slice(1, field.length)] = -1;
                    }
                    else {
                        queryString[field] = 1;
                    }
                });
                this.query = this.query.sort(queryString);
            }
            else {
                this.query = this.query.sort("-createdAt");
            }
            return this;
        };
        this.paginate = () => {
            // page1 limit 5
            // 1-5
            // page4 limit 5
            // 15-20
            // if don't have per_pages default is 10;
            const numOfLimit = this.queryString.per_pages ? this.queryString.per_pages * 1 : 10;
            // if dont' have page default page: 1 -> skip 0;
            const numOfSkip = this.queryString.page ? (this.queryString.page - 1) * numOfLimit : 0;
            this.query = this.query.skip(numOfSkip).limit(numOfLimit);
            return this;
        };
        this.query = query; // query in mongooose
        this.queryString = queryString; // query object from req.query
    }
}
exports.default = APIFeature;
//# sourceMappingURL=APIFeatures.js.map
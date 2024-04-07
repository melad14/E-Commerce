

export class ApiFeatures {
    constructor(mongooseQuery, queryString) {

        this.mongooseQuery = mongooseQuery
        this.queryString = queryString
    }

    pagination() {

        let page = this.queryString.page * 1 || 1
        if (this.queryString.page <= 0) page = 1
        let skip = (page - 1) * 10;
        this.page = page
        this.mongooseQuery.skip(skip).limit(10)
        return this
    }

    filter() {

        let filter = { ...this.queryString }
        let out = ['page', 'sort', 'fields', 'keyword']
        out.forEach((q) => {
            delete filter[q]
        })
        filter = JSON.stringify(filter)
        filter = filter.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        filter = JSON.parse(filter)
        this.mongooseQuery.find(filter)
        return this
    }

    sorting() {
        if (this.queryString.sort) {
            let sortBy = this.queryString.sort.split(',').join(' ')
            this.mongooseQuery.sort(sortBy)
        }
        return this
    }
    search() {
        if (this.queryString.keyword) {
            this.mongooseQuery.find({
                $or: [
                    { name: { $regex: this.queryString.keyword, $options: 'i' } },
                    { description: { $regex: this.queryString.keyword, $options: 'i' } },
                ]
            })
        }
        return this
    }
    feilds() {
        if (this.queryString.fields) {
            let fields = this.queryString.fields.split(',').join(' ')
            this.mongooseQuery.select(fields)

        }
        return this
    }

}
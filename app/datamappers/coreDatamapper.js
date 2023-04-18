class CoreDatamapper {
    tableName;

    constructor(client) {
        this.client = client;
    }

    async findByPk(id) {
        const baseQuery = {
            text: `SELECT * FROM "${this.tableName}" WHERE id = $1`,
            values: [id],
        };
        const result = await this.client.query(baseQuery);

        if (!result.rows[0]) {
            return null;
        }
        return result.rows[0];
    }

    async findAll(params) {
        let filter = '';
        const values = [];
        if (params?.$where) {
            const filters = [];
            let indexPlaceholder = 1;

            Object.entries(params.$where).forEach(([param, value]) => {
                if (param === '$or') {
                    const filtersOr = [];
                    Object.entries(value).forEach(([key, val]) => {
                        filtersOr.push(`"${key}"= $${indexPlaceholder}`);
                        values.push(val);
                        indexPlaceholder += 1;
                    });
                    filters.push(`(${filtersOr.join(' OR ')})`);
                } else {
                    filters.push(`"${param}"= $${indexPlaceholder}`);
                    values.push(value);
                    indexPlaceholder += 1;
                }
            });
            filter = `WHERE ${filters.join(' AND ')}`;
        }

        const baseQuery = {
            text: ` 
    SELECT * FROM "${this.tableName}" ${filter}`,
            values,
        };
        const result = await this.client.query(baseQuery);

        return result.rows;

    }

    async create(inputData) {
        const fields = [];
        const placeholders = [];
        const values = [];
        let indexPlaceholder = 1;

        Object.entries(inputData).forEach(([prop, value]) => {
            fields.push(`"${prop}"`);
            placeholders.push(`$${indexPlaceholder}`);
            indexPlaceholder += 1;
            values.push(value);
        });

        const baseQuery = {
            text: ` INSERT INTO "${this.tableName}" (${fields}) VALUES (${placeholders}) RETURNING *`,
            values,
        };

        const result = await this.client.query(baseQuery);
        const row = result.rows[0];

        return row;
    }

    async update({ id }, inputData) {
        const fieldsAndPlaceholders = [];
        let indexPlaceholder = 1;
        const values = [];

        Object.entries(inputData).forEach(([prop, value]) => {
            fieldsAndPlaceholders.push(`"${prop}" = $${indexPlaceholder}`);
            indexPlaceholder += 1;
            values.push(value);
        });

        values.push(id);

        const baseQuery = {
            text: ` UPDATE "${this.tableName}" SET ${fieldsAndPlaceholders}, updated_at = now() WHERE id = $${indexPlaceholder} RETURNING *`, values,
        };

        const result = await this.client.query(baseQuery);
        const row = result.rows[0];

        return row;
    }

    async delete(id) {
        const result = await this.client.query(`DELETE FROM "${this.tableName}"  WHERE id= $1 ` , [id])
        return !!result.rowCount;
    }

}

module.exports = CoreDatamapper;
class JSONMaid {
	#jsondata = {};

	constructor(jsondata) {
		try {
			this.#jsondata = JSON.parse(jsondata);
		} catch(ignore) {
		}finally {
			if(!this.#jsondata) {
				this.#jsondata = {};
			}
		}
	}

	get records() {
		return this.#jsondata;
	}

	get records_count() {
		if(this.#jsondata) {
			return Object.values(this.#jsondata).length;
		}

		return 0;
	}

	get_index_of(record) {
        const keys = Object.keys(this.#jsondata);
        
        let x = 0;
        for(let i = 0; i < keys.length; i++) {
            if(keys[i] === record) {
                return x;
            }
            x++;
        }

        return null;
    }

	save() {
		try {
			return JSON.stringify(this.#jsondata);
		} catch(e) {
			console.error(e);
		}

		return false;
	}

	delete_records() {
		this.#jsondata = {};
	}

	get_record(record) {
		return this.#jsondata[record];
	}

    get_record_by_properties(properties = {}) {
        let result = [];
        const keys = Object.keys(properties);

        if(this.records_count === 0 || keys.length === 0) {
            return result;
        }

        Object.values(this.#jsondata).forEach(record => {
            let matchesAll = true; 

            for (const k of keys) {
                if (record[k] !== properties[k]) {
                    matchesAll = false;
                    break;
                }
            }

            if(matchesAll) {
                result.push(record);
            }
        });

        return result;
    }

	delete_record(index) {
		delete this.#jsondata[index];
	}

	put_record(record, data) {
		let can_be_added = true;

		if(this.records_count > 0) {
			can_be_added = !this.get_record(record);
		}

		if(can_be_added) {
			this.#jsondata[record] = data;
		}

		return can_be_added;
	}

	update_record(record, new_data, new_name) {
		this.#jsondata[record] = new_data;

		this.delete_record(record);

		if(String(new_name).trim().length > 0) {
			this.put_record(new_name, new_data);
		}
	}
}

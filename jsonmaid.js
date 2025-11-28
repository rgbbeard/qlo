class JSONMaid {
	#jsondata = {};

	constructor(jsondata) {
		try {
			this.#jsondata = JSON.parse(jsondata);
		} catch(ignore) {
			this.#jsondata = {};
		}
	}

	get get_records() {
		return this.#jsondata;
	}

	get records_count() {
		return this.#jsondata.length;
	}

	get_index_of(record) {
		x = 0;

		for(let i in Object.keys(this.get_records)) {
			if(i === record) {
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

		return this.save();
	}

	get_record(record) {
		return this.get_records[record];
	}

	delete_record(index) {
		delete this.#jsondata[index];

		return this.save();
	}

	put_record(record, data) {
		let 
			can_be_added = true,
			records_count = data.length;

		for(let i in Object.keys(this.get_records)) {
			if(i === record) {
				can_be_added = false;
				break;
			}
		}

		if(can_be_added) {
			this.#jsondata[record] = data;

			return this.save();
		}

		return can_be_added;
	}

	update_record(record, new_data, new_name = false) {
		let data = this.get_records;

		this.#jsondata[record] = new_data;

		this.delete_record(record);

		if(String(new_name).trim().length > 0) {
			this.put_record(new_name, new_data);
		}

		return this.save();
	}
}

var suppliersVm = new Vue({
	el: '#suppliers',
	data: function() {
		return {
			suppliers: suppliers,
			activeCategory: suppliers[0].categoryName,
			search: ''
		};
	},
	mounted: function() {
		this.setSupplier();
		this.setKeys();
	},
	methods: {
		setSupplier: function() {
			var url = new URL(location.href);
			var searchParams = new URLSearchParams(url.search);
			if (searchParams.has('supplier')) {
				this.activeCategory = searchParams.get('supplier');
			}
		},
		setKeys: function() {
			this.suppliers = this.suppliers.map(function(category) {
				category.items = category.items.map(function(supplier) {
					supplier.key =
						'key' +
						Math.random()
							.toString(36)
							.substr(2, 9);
					return supplier;
				});
				return category;
			});
		}
	},
	computed: {
		allSuppliers: function() {
			return this.suppliers.reduce(function(accumulator, category) {
				accumulator = [...accumulator, ...category.items];
				return accumulator;
			}, []);
		},
		activeSuppliers: function() {
			var that = this;
			if (this.search != '') {
				var all = _.uniqWith(this.allSuppliers, function(
					arrVal,
					othVal
				) {
					return arrVal.name == othVal.name;
				});
				return all.filter(function(element) {
					return _.includes(
						element.name.toLowerCase(),
						that.search.toLowerCase()
					);
				});
			}
			if (this.activeCategory == 'Alle') {
				return _.uniqWith(this.allSuppliers, function(arrVal, othVal) {
					return arrVal.name == othVal.name;
				});
			}
			return this.suppliers.find(function(supplier) {
				return supplier.categoryName == that.activeCategory;
			}).items;
		}
	}
});

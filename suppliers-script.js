var suppliersVm = new Vue({
	el: '#suppliers-app',
	data: function() {
		return {
			suppliers: suppliers,
			activeCategory: suppliers[0].categoryName,
			search: '',
			listType: 'cards'
		}
	},
	mounted: function() {
		this.setKeys()
		this.combineSuppliersInAll()
	},
	methods: {
		setKeys: function() {
			this.suppliers = this.suppliers.map(function(category) {
				category.items = category.items.map(function(supplier) {
					supplier.key =
						'key' +
						Math.random()
							.toString(36)
							.substr(2, 9)
					return supplier
				})
				return category
			})
		},
		combineSuppliersInAll: function() {
			this.suppliers[0].items = _.uniqWith(this.allSuppliers, function(
				arrVal,
				othVal
			) {
				return arrVal.name == othVal.name
			})
		}
	},
	computed: {
		allSuppliers: function() {
			return this.suppliers
				.reduce(function(accumulator, category) {
					return $.merge(accumulator, category.items)
				}, [])
				.slice()
				.sort(function(a, b) {
					return a.name > b.name ? 1 : -1
				})
		},
		activeSuppliers: function() {
			var that = this
			if (this.search != '') {
				var all = _.uniqWith(this.allSuppliers, function(
					arrVal,
					othVal
				) {
					return arrVal.name == othVal.name
				})
				return all
					.filter(function(element) {
						return _.includes(
							element.name.toLowerCase(),
							that.search.toLowerCase()
						)
					})
					.slice()
					.sort(function(a, b) {
						return a.name > b.name ? 1 : -1
					})
			}
			return this.suppliers
				.filter(function(supplier) {
					return supplier.categoryName == that.activeCategory
				})[0]
				.items.slice()
				.sort(function(a, b) {
					return a.name > b.name ? 1 : -1
				})
		},
		suppliersAmount: function() {
			return this.suppliers.reduce(function(accumulator, supplier) {
				return accumulator + supplier.items.length
			}, 0)
		}
	}
})

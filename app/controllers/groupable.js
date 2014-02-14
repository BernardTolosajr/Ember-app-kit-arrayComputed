export default Ember.ObjectController.extend({
	actions: {
		select: function(deals) {
			deals.forEach(function(item, index) {
				console.log(item.get('name'));
			});
		}
	},
	dealTotals: Ember.arrayComputed('deals', 'deals.@each.state', {
			initialValue: [],
			initialize: function(array, changeMeta, instanceMeta) {

				array.pushObject(Ember.Object.create({key: 'Initiated',name: 'Initiated',count: 0,value: 0,deals: Ember.A()}));
				array.pushObject(Ember.Object.create({key: 'Negotiating',name: 'Negotiating',count: 0,value: 0,deals: Ember.A()}));
				array.pushObject(Ember.Object.create({key: 'Pending',name: 'Pending',count: 0,value: 0,deals: Ember.A()}));
				array.pushObject(Ember.Object.create({key: 'Closed',name: 'Closed Deals',count: 0,value: 0,deals: Ember.A()}));
				array.pushObject(Ember.Object.create({key: 'Lost',name: 'Lost Deals',count: 0,value: 0,deals: Ember.A()}));

		},
		addedItem: function(array, item, changeMeta, instanceMeta) {

			var company = item.get('company'),
					group, state;

			state = item.get('state');
			group =	array.findBy('key', state);
			group.incrementProperty('count');
			group.incrementProperty('value', item.get('value'));
			group.get('deals').pushObject(item);

			return array;

		},
		removedItem: function(array, deal, changeMeta, instanceMeta) {
			var group;
			group = array.find(function(group) {
				return group.get('deals').contains(deal);
			});
			
			if (!group) {
				return;
			}

			group.decrementProperty('count');
			group.decrementProperty('value', deal.get('value'));
			group.get('deals').removeObject(deal);

			return array;
		}
	})

});

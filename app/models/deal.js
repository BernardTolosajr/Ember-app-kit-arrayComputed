var deal = DS.Model.extend({
	name: DS.attr('string'),
	state: DS.attr('string'),
	company: DS.belongsTo('company')
});

export default deal;

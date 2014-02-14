import deal from "appkit/models/deal";

var company = DS.Model.extend({
	name: DS.attr('string'),
	deals: DS.hasMany('deal', {async: true})
});

var dealStates = Ember.A([
	Ember.Object.create({name: 'Initiated'}),
	Ember.Object.create({name: 'Negotiating'}),
	Ember.Object.create({name: 'Pending'}),
	Ember.Object.create({name: 'Closed'}),
	Ember.Object.create({name: 'Lost'})
]);

deal.FIXTURES = [];

company.FIXTURES = [
	{
		id: 1,
		name: 'Acme Ltd',
		deals: []
	},
	{
		id: 2,
		name: 'Banana Bombs',
		deals: []
	},
	{
		id: 3,
		name: 'Continuity2',
		deals: []
	},
	{
		id: 4,
		name: 'Mc Burney & Cowan',
		deals: []
	}
];

for(var i = 1; i < 50; i++){
	var state = dealStates[Math.floor(Math.random()* dealStates.length)];
	var companyId = Math.floor(Math.random()* 5) + 1;

	deal.FIXTURES.push({
		id: i,
		name: 'Deal ' + i,
		state: state.get('name'),
		company: companyId
	});


	var c = company.FIXTURES.find(function(fixture){ return fixture.id === companyId; });

	if (c !== undefined) {
		c.deals.push(i);
	}

}

export default company;

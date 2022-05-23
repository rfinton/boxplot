gsap.to($('.prompt'), {
	duration: .1,
	opacity: 0,
	yoyo: true,
	repeat: -1,
	repeatDelay: .2
});

function backspace() {
	if(!iter.hasNext()) {
		iter.reset();
	}

	$('.text-writer').each(function() {
		let text = this.textContent;
		this.textContent = text.substring(0, text.length - 1);
	});

	if($('.text-writer:first-child').html() != '') {
		gsap.set($('.text-writer'), {
			x: 0,
			delay: .02,
			onComplete: backspace
		});
	} else {
		iter.hasNext() && typeText(iter.next());
	}
}

function typeText(text) {
	$('.text-writer').each(function() {
		this.textContent = text.substring(0, this.textContent.length + 1);
	});

	if($('.text-writer:first-child').html() != text) {
		gsap.set($('.text-writer'), {
			x: 0,
			delay: .08,
			onComplete: typeText,
			onCompleteParams: [text]
		});
	} else {
		gsap.set($('.text-writer'), {
			x: 0,
			delay: 3,
			onComplete: backspace
		});
	}
}

let Iterator = function(items) {
	this.index = 1;
	this.items = items;
};

Iterator.prototype = {
	first: function() {
		this.reset();
		return this.next();
	},
	next: function() {
		return this.items[this.index++];
	},
	hasNext: function() {
		return this.index < this.items.length;
	},
	reset: function() {
		this.index = 0;
	},
	each: function(callback) {
		for(let item = this.first(); this.hasNext(); item = this.next()) {
			callback(item);
		}
	}
};

let items = [
	"Use your company's data to make smarter business decisions.",
	"Automate your company's data work flows to save time.",
	"Pull together data from different corporate systems to tell a story.",
	"Keep a pulse on KPIs with real time dashboards.",
	"Overlay external data with your org's internal data for deeper insights.",
	"Visualize your critical metrics with actionable reports."
];

let iter = new Iterator(items);

gsap.set($('#text-writer'), {
	x: 0,
	delay: 5,
	onComplete: backspace
});
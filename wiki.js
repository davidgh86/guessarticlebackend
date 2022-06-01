const wiki = require('wikipedia');

async function getContent() {
	try {
		wiki.setLang("es")
        const randomTitle = await wiki.random("title")
        const page = await wiki.page(randomTitle.items[0].title);
		
		const summary = await page.summary();
        const title = summary.title
        const content = await page.content();
        return {title, content}
	} catch (error) {
		console.log(error);
		//=> Typeof wikiError
	}
};

module.exports.getContent = getContent;


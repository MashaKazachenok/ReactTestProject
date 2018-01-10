var myNews = [
{
author: 'Sasha Petrov',
text: 'Yesterday evening, when the Princess came home...'
},
{
author: 'Just Vasya',
text: 'La-la-la'
},
{
author: 'Guest',
text: 'Absolutely free. Download...'
}
];

var Article = React.createClass({
render: function() {
var data = this.props.data;

return (
	<div className="article">
<p className="newsAuthor">{data.author}:</p>
<p className="newsText">{data.text}</p>
</div>
);
}
});

var News = React.createClass({
render: function() {
var data = this.props.data;
var newsTemplate;
if (data.length > 0) {
newsTemplate = data.map(function(item, index) {
return (
<div key={index}>
<Article data={item} />
</div>
)
})
} else {
newsTemplate = <p>Unfortunately there is no news</p>
} 
return (
<div className="news">
{newsTemplate}
<strong className={'newsCount ' + (data.length > 0 ? '':'none') }>Total news: {data.length}</strong>
</div>
);
}
});

var App = React.createClass({
render: function() {
return (
<div className="app">
<h3>News</h3>
<News data={myNews} />

</div>
);
}
});
ReactDOM.render(
<App />,
document.getElementById('root')
);
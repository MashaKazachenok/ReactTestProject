var my_news = [
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

var News = React.createClass({
render: function() {
var data = this.props.data;
var newsTemplate;
if (data.length > 0) {
newsTemplate = data.map(function(item, index) {
return (
<div key={index}>
<p className="news__author">{item.author}:</p>
<p className="news__text">{item.text}</p>
</div>
)
})
} else {
newsTemplate = <p>Unfortunately there is no news</p>
} 
return (
<div className="news">
{newsTemplate}
<strong className={data.length > 0 ? '':'none'}>Total news: {data.length}</strong>
</div>
);
}
});

var Comments = React.createClass({
render: function() {
return (
<div className="comments">
No news - nothing to comment.
</div>
);
}
});

var App = React.createClass({
render: function() {
return (
<div className="app">
Hello everyone, I am an App component! I can display news.
<News data={my_news} />
<Comments />
</div>
);
}
});
ReactDOM.render(
<App />,
document.getElementById('root')
);
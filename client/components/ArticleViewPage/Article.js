import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { getArticle, clearArticle, submitEdit } from '../../actions';

export class ArticleContainer extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    this.props.getArticle(this.props.id)
      .then(article => {
        var upViewCount = this.props.article;
        upViewCount.viewCount++;
        this.props.submitEdit(upViewCount);
      })
  }

  render() {
    const {article, title, issue, issuePreview, solution, auth} = this.props;
    return(
      <div className="article-list-container">
        <div className="full-article">
          <h3 className="main">{article.title}</h3>
          <h5 className="full-article-title">Summary</h5>
          <ReactMarkdown
            escapeHTML="true"
            source={article.issuePreview}
            className="content" />
          <h5 className="full-article-title">Issue</h5>
          <ReactMarkdown
            escapeHTML="true"
            source={article.issue}
            className="content" />
          <h5 className="full-article-title">Solution</h5>
          <ReactMarkdown
            escapeHTML="true"
            source={article.solution}
            className="content" />
            {console.log(auth)}
            {
              auth[0] === 'userPlus' || auth[0] === 'admin'
                ? <Link to={`/articles/edit/${article.id}`}>
                    <button
                      className="article-list-button">
                        edit
                    </button>
                  </Link>
                : null
            }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  article: state.articleDisplay,
  auth: state.userReducer.currentUser.roles,
})
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getArticle,
  submitEdit,
  clearArticle,
}, dispatch)

const Article = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleContainer);

export default Article;


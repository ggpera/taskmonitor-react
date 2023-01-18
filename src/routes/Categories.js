import React from 'react';
import CategoryController from '../components/CategoryController';

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      show: false,
      categories: [],
      tasks: [],
    };
  }
  componentDidMount() {
    // fetch data for categories from the API
    fetch('http://127.0.0.1:3010/categories')
      .then((res) => res.json())
      .then(
        (jsonObject) => {
          this.setState({
            loading: false,
            categories: jsonObject.concat(this.state.categories),
          });
        },
        (error) => {
          this.setState({
            loading: false,
            error,
          });
        },
      );
  }

  render() {
    if (this.state.error) {
      return (
        <div className='center'>
          Jokin meni pieleen! <br />
          {this.state.error.message}
        </div>
      );
    } else if (this.state.loading) {
      return (
        <div>
          <div className='loading-spinner'></div>
        </div>
      );
    } else {
      return (
        <div>
          <div className='center'>
            <br></br>
            <h1 className='main'>Kategoriat</h1>
          </div>
          <CategoryController
            categories={this.state.categories}
            tasks={this.state.tasks}
          />
        </div>
      );
    }
  }
}

export default Categories;

import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Timer from '../components/Timer';

class Tracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      categories: [],
      tasks: [],
      filteredTasks: [],
      filterId: '',
      title: '',
    };
  }

  // Fetch data for tasks and categories from the API
  componentDidMount() {
    fetch(`${process.env.REACT_APP_BACKEND}/tasks`)
      .then((res) => res.json())
      .then(
        (jsonObject) => {
          this.setState({
            loading: false,
            tasks: jsonObject.concat(this.state.tasks),
            filteredTasks: jsonObject.concat(this.state.tasks),
            filterId: 'All',
            title: 'Kaikki',
          });
        },
        (error) => {
          this.setState({
            loading: false,
            error,
          });
        },
      );
    fetch(`${process.env.REACT_APP_BACKEND}/categories` )
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

  // Callback filter after filter id state has been set
  handleFilter = (id) => {
    if (this.state.filterId === id) {
      this.setState({
        filteredTasks: [],
        filterId: '',
        title: '',
      });
    } else {
      localStorage.setItem('filterId', id);
      this.setState({ filterId: id }, () => {
        if (this.state.filterId !== 'All') {
          const cat = this.state.categories.filter(
            (cat) => cat.id === this.state.filterId,
          );
          const title = cat.map((res) => res.type);
          const filter = this.state.tasks.filter((task) =>
            task.catId.includes(this.state.filterId),
          );
          this.setState({ filteredTasks: filter, title: title });
        } else if (this.state.filterId === 'All') {
          this.setState({
            filteredTasks: this.state.tasks,
            title: 'Kaikki',
          });
        }
      });
    }
  };

  // Reorders the task list when a task is dragged and dropped
  onDragEnd = (res) => {
    if (!res.destination) {
      return;
    } else {
      const dragged = Array.from(this.state.filteredTasks);
      const [reorderedTask] = dragged.splice(res.source.index, 1);
      dragged.splice(res.destination.index, 0, reorderedTask);

      this.setState({
        filteredTasks: dragged,
      });
    }
  };
  // Timer callback for stop button press
  stopCallback = (start, time, active, id) => {
    let newTasks = [...this.state.tasks];
    newTasks[id - 1].time = time;
    newTasks[id - 1].active = active;
    newTasks[id - 1].start = start;
    this.setState({
      tasks: newTasks,
    });
    fetch(`${process.env.REACT_APP_BACKEND}/tasks/` + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        time: newTasks[id - 1].time,
        active: newTasks[id - 1].active,
        start: newTasks[id - 1].start,
      }),
    });
  };
  // Timer callback for start button press
  startCallback = (start, active, id) => {
    let newTasks = [...this.state.tasks];
    newTasks[id - 1].active = active;
    newTasks[id - 1].start = start;
    this.setState({
      tasks: newTasks,
    });
    fetch(`${process.env.REACT_APP_BACKEND}/tasks/` + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        active: newTasks[id - 1].active,
        start: newTasks[id - 1].start,
      }),
    });
  };

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
            <h1 className='main'>Seuranta</h1>
          </div>
          <div className='title-wrapper'>
            <div className='filter'>
              <ul className='catlist'>
                <li style={{ marginBottom: '0' }}>
                  <button
                    className={'catbutton'}
                    onClick={() => this.handleFilter('All')}
                  >
                    Kaikki
                  </button>
                </li>
                {this.state.categories.map((cat) => (
                  <li key={cat.id} style={{ marginBottom: '0' }}>
                    <button
                      className='catbutton'
                      onClick={() => this.handleFilter(cat.id)}
                    >
                      {[cat.type]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='middle' style={{ backgroundColor: '#e9dfdf' }}>
            <h3 style={{ marginTop: '0', textAlign: 'center' }}>
              {this.state.title}
            </h3>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId='tasks' direction='vertical'>
                {(provided) => (
                  <ul
                    className='trackerul'
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {this.state.filteredTasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.name}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <span className='type'>{task.name}</span>
                            <Timer
                              key={task.id}
                              stopCallback={this.stopCallback}
                              startCallback={this.startCallback}
                              id={task.id}
                              time={task.time}
                              start={task.start}
                              active={task.active}
                            />
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      );
    }
  }
}

export default Tracker;

const BOARD_SAVE = 'SAVE';
const BOARD_REMOVE = 'REMOVE';
const BOARD_READ = 'READ';
const BOARD_LIST = 'LIST';

// export const board_save = createAction(BOARD_SAVE);
// export const board_remove = createAction(BOARD_REMOVE, brdno => brdno);
// export const board_read = createAction(BOARD_READ);
// export const board_list = createAction(BOARD_LIST);

export const board_save = data => ({ type: BOARD_SAVE, data });
export const board_remove = brdno => ({ type: BOARD_REMOVE, brdno: brdno });
export const board_read = brdno => ({ type: BOARD_READ, brdno: brdno });
export const board_list = () => ({ type: BOARD_LIST });

const initialState = {
  maxNo: 3,
  boards: [
    {
      id: 1,
      writer: 'Lee SunSin',
      title: 'If you intend to live then you die',
      content: ' content 1',
      date: new Date()
    },
    {
      id: 2,
      writer: 'Lee SunSin',
      title: 'If you intend to live then you die',
      content: ' content 2',
      date: new Date()
    },
    {
      id: 3,
      writer: 'Lee SunSin',
      title: 'If you intend to live then you die',
      content: ' content 3',
      date: new Date()
    },
    {
      id: 4,
      writer: 'Lee SunSin',
      title: 'If you intend to live then you die',
      content: ' content 4',
      date: new Date()
    },
    {
      id: 5,
      writer: 'Lee SunSin',
      title: 'If you intend to live then you die',
      content: ' content 5',
      date: new Date()
    },
    {
      id: 6,
      writer: 'Lee SunSin',
      title: 'If you intend to live then you die',
      content: ' content 6',
      date: new Date()
    },
    {
      id: 7,
      writer: 'Lee SunSin',
      title: 'If you intend to live then you die',
      content: ' content 7',
      date: new Date()
    },
    {
      id: 8,
      writer: 'Lee SunSin',
      title: 'If you intend to live then you die',
      content: ' content 8 ',
      date: new Date()
    }
  ],
  videoData: [
    {
      title: 'vidoe',
      url: 'https://www.youtube.com/embed/watch?v=g0GefIoia-0',
      width: '100%'
    },
    {
      title: 'vidoe',
      url: 'https://www.youtube.com/embed/watch?v=g0GefIoia-0',
      width: '100%'
    },
    {
      title: 'vidoe',
      url: 'https://www.youtube.com/embed/watch?v=g0GefIoia-0',
      width: '100%'
    },
    {
      title: 'vidoe',
      url: 'https://www.youtube.com/embed/watch?v=g0GefIoia-0',
      width: '100%'
    },
    {
      title: 'vidoe',
      url: 'https://www.youtube.com/embed/watch?v=g0GefIoia-0',
      width: '100%'
    },
    {
      title: 'vidoe',
      url: 'https://www.youtube.com/embed/watch?v=g0GefIoia-0',
      width: '100%'
    }
  ],
  tileData: [
    {
      img: require('images/main.jpg'),
      title: 'Image',
      author: 'author'
    },
    {
      img: require('images/main.jpg'),
      title: 'Image',
      author: 'author'
    },
    {
      img: require('images/main.jpg'),
      title: 'Image',
      author: 'author'
    },
    {
      img: require('images/main.jpg'),
      title: 'Image',
      author: 'author'
    },
    {
      img: require('images/main.jpg'),
      title: 'Image',
      author: 'author'
    },
    {
      img: require('images/main.jpg'),
      title: 'Image',
      author: 'author'
    },
    {
      img: require('images/main.jpg'),
      title: 'Image',
      author: 'author'
    },
    {
      img: require('images/main.jpg'),
      title: 'Image',
      author: 'author'
    }
  ],
  selectedBoard: {}
};

export default function board_reducer(state = initialState, action) {
  let boards = state.boards;

  switch (action.type) {
    case BOARD_SAVE:
      let data = action.data;
      let maxNo = state.maxNo;
      if (!data.brdno) {
        return {
          maxNo: maxNo + 1,
          boards: boards.concat({ ...data, brdno: maxNo, brddate: new Date() }),
          selectedBoard: {}
        };
      }
      return {
        ...state,
        boards: boards.map(row =>
          data.brdno === row.brdno ? { ...data } : row
        ),
        selectedBoard: {}
      };

    case BOARD_REMOVE:
      return {
        ...state,
        boards: boards.filter(row => row.brdno !== action.brdno),
        selectedBoard: {}
      };

    case BOARD_READ:
      return {
        ...state,
        selectedBoard: boards.find(row => row.brdno === action.brdno)
      };

    default:
      return state;
  }
}

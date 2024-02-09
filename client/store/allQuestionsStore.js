import Axios from "axios";

const SET_QUESTIONS ="SET_QUESTIONS"
const CREATE_QUESTION = "CREATE_QUESTION"
const DELETE_QUESTION = "DELETE_QUESTION"


export const setQuestions = (question) =>{
  return{
    type: SET_QUESTIONS,
    question
  }
};

const _createQuestion = (question) => {
  return {
    type: CREATE_QUESTION,
    question,
  };
};

const _deleteQuestion = (question) => {
  return {
    type: DELETE_QUESTION,
    question
  };
};

export const fetchQuestions = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/questions");
        dispatch(setQuestions(data));
  };
};

export const createQuestion = (question) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/questions", question);
    dispatch(_createQuestion(created));
    // history.push("/questions");
  };
};

export const deleteQuestion = (id, history) => {
  return async (dispatch) => {
    const { data: question } = await Axios.delete(`/api/questions/${id}`);
    dispatch(_deleteQuestion(question));
    history.push("/questions");
  };
};


const initialState = [];
export default function questionsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_QUESTIONS:
      return action.question;
      case CREATE_QUESTION:
        return [...state, action.question];
        case DELETE_QUESTION:
      return state.filter((question) => question.id !== action.question.id)
      ;
      default:
        return state;
    }
  }

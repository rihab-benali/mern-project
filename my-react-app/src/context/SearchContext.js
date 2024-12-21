import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  city: undefined,
  dates: [
    {
      startDate: new Date(), // Default start date: today
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)), // Default end date: tomorrow
    },
  ],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

// Modify startDate and endDate to remove time for date-related comparisons
INITIAL_STATE.dates[0].startDate.setHours(0, 0, 0, 0); // Set startDate to midnight (no time)
INITIAL_STATE.dates[0].endDate.setHours(0, 0, 0, 0); // Set endDate to midnight (no time)

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

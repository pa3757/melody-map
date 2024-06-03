import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainPage from "./component/MainPage";
import Test1 from "./component/Test1";
import Test2 from "./component/Test2";
import Test3 from "./component/Test3";
import Test4 from "./component/Test4";
import Test5 from "./component/Test5";
import Test6 from "./component/Test6";
import Test7 from "./component/Test7";
import Test8 from "./component/Test8";
import Test9 from "./component/Test9";
import Test10 from "./component/Test10";
import Result from "./component/Result";
import Login from "./component/Login";
import Join from "./component/Join";
import Detail from "./component/Detail";
import Statistics from "./component/Statistics";
import Mypage from "./component/Mypage";
import TravelBoard from "./component/TravelBoard";
import Travelwrite from "./component/Travelwrite";
import Reviewdetail from "./component/Reviewdetail";
import SideBar from "./component/SideBar";
import CourseRecom from "./component/Course_recom";
import Coursepreview from "./component/Course_preview";
import CourseDetail from "./component/Course_Detail";
import Resultshare from "./component/Resultshare";

const App = () => {
  const [travelEntries, setTravelEntries] = useState([]);

  const addTravelEntry = (entry) => {
    setTravelEntries([...travelEntries, entry]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/test1" element={<Test1 />} />
        <Route path="/test2" element={<Test2 />} />
        <Route path="/test3" element={<Test3 />} />
        <Route path="/test4" element={<Test4 />} />
        <Route path="/test5" element={<Test5 />} />
        <Route path="/test6" element={<Test6 />} />
        <Route path="/test7" element={<Test7 />} />
        <Route path="/test8" element={<Test8 />} />
        <Route path="/test9" element={<Test9 />} />
        <Route path="/test10" element={<Test10 />} />
        <Route path="/Result" element={<Result />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/courserecom" element={<CourseRecom />} />
        <Route path="/coursepreview" element={<Coursepreview />} />
        <Route path="/coursedetail" element={<CourseDetail />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/reviewdetail/:entryId" element={<Reviewdetail />} />
        <Route path="/resultshare" element={<Resultshare />} />
        <Route
          path="/travelboard"
          element={<TravelBoard travelEntries={travelEntries} />}
        />
        <Route
          path="/travelwrite"
          element={<Travelwrite addTravelEntry={addTravelEntry} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

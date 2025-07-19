import { getAuth } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faChartLine,
  faPlus,
  faExclamationTriangle,
  faUserShield,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"
const Dashboard = ({admin}) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  return (
    <div className="flex w-full">
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex flex-col gap-10 justify-center">

          <div className="flex gap-10">

            <div className="bg-white w-[50%] h-[180px] p-4 rounded-xl shadow-md hover:shadow-lg transition flex flex-col justify-between relative" onClick={()=>navigate("/reportedissue")}>
              <div className="flex items-center justify-center rounded-md w-20 h-20 shadow-sm  hover:shadow-xl" > 
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-black text-4xl" />
              </div>
              <div className="">
                {" "}
                <h2 className="text-lg font-bold">Report Issue</h2>
                <p className="text-sm text-gray-600">
                  View all reported issues and their status.
                </p>
              </div>
              <div className="absolute top-4 right-4">
                <FontAwesomeIcon icon={faArrowRight} className="text-black text-sm" />
              </div>
            </div>

            <div className="bg-white w-[50%] h-[180px] p-4 rounded-xl shadow-md hover:shadow-lg transition flex flex-col justify-between relative" onClick={()=>navigate("/raiseissue")}>
              <div className="flex items-center justify-center rounded-md w-20 h-20 shadow-sm hover:shadow-xl" > 
                <FontAwesomeIcon icon={faPlus} className="text-black text-4xl" />
              </div>
              <div className="">
                {" "}
                <h2 className="text-lg font-bold">Raise New Issue</h2>
                <p className="text-sm text-gray-600">
                  Report a new problem or concern.
                </p>
              </div>
              <div className="absolute top-4 right-4">
                <FontAwesomeIcon icon={faArrowRight} className="text-black text-sm" />
              </div>
            </div>

          </div>
          <div className="flex gap-10">

            {admin && <div className="bg-white w-[50%] h-[180px] p-4 rounded-xl shadow-md hover:shadow-lg transition flex flex-col justify-between relative" onClick={()=>navigate("/adminpanel")}>
              <div className="flex items-center justify-center rounded-md w-20 h-20 shadow-sm hover:shadow-xl" > 
                <FontAwesomeIcon icon={faUserShield} className="text-black text-4xl" />
              </div>
              <div className="">
                {" "}
                <h2 className="text-lg font-bold">Admin Panel</h2>
                <p className="text-sm text-gray-600">
                  Manage system settings and configurations .
                </p>
              </div>
              <div className="absolute top-4 right-4">
                <FontAwesomeIcon icon={faArrowRight} className="text-black text-sm" />
              </div>
            </div>}

            <div className="bg-white w-[50%] h-[180px] p-4 rounded-xl shadow-md hover:shadow-lg transition flex flex-col justify-between relative" onClick={()=>navigate("/adminpanel")}>
              <div className="flex items-center justify-center rounded-md w-20 h-20 shadow-sm hover:shadow-xl" > 
                <FontAwesomeIcon icon={faChartLine} className="text-black text-4xl" />
              </div>
              <div className="">
                {" "}
                <h2 className="text-lg font-bold">Your Activity & Status</h2>
                <p className="text-sm text-gray-600">
                  View your dashboard and activity history.
                </p>
              </div>
              <div className="absolute top-4 right-4">
                <FontAwesomeIcon icon={faArrowRight} className="text-black text-sm" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;

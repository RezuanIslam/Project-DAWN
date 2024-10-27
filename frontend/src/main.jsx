import { registerLicense } from "@syncfusion/ej2-base";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App.jsx";
import Layout from "./components/Layout.jsx";
import "./index.css";
import AnamolyDetection from "./pages/anomaly-detection/anomaly-detection.jsx";
import CropRecommendationPage from "./pages/CropRecommendationPage.jsx";
import CropYieldPredictionPage from "./pages/CropYieldPredictionPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import CalendarApp from "./pages/FarmingCalendarPage.jsx";
import FarmingSchedulerCreationForm from "./pages/FarmingSchedulerCreationForm.jsx";
import FarmingSimulatorPage from "./pages/FarmingSimulatorPage.jsx";
import FarmSimulatorCreatorForm from "./pages/FarmSimulatorCreatorForm.jsx";
import FertilizersRecommendationPage from "./pages/FertilizersRecommendationPage.jsx";
import NDVI from "./pages/NDVI.jsx";
import PestDetectionPage from "./pages/PestDetectionPage.jsx";
import PlantDiseaseDetectionPage from "./pages/PlantDiseaseDetectionPage.jsx";
import PlantGrowthStagePage from "./pages/PlantGrowthStagePage.jsx";
import SoilMoistureMonitoringPage from "./pages/SoilMoistureMonitoringPage.jsx";
import AirTemperatureAndHumidityMonitoringPage from "./pages/AirTemperatureAndHumidityMonitoringPage.jsx";
import SoilTemperatureMonitoring from "./pages/SoilTemperatureMonitoring.jsx";
import SoilPHAndWaterPHMonitoringPage from "./pages/SoilPHAndWaterPHMonitoringPage.jsx";
import ExoplanetExplorationPage from "./pages/ExoplanetExplorationPage.jsx";
import FarmMonitoringHistoryPage from "./pages/FarmMonitoringHistoryPage.jsx";
import BudgetPage from "./pages/BudgetPage.jsx";
import SoilMoistureMapping from "./pages/SoilMoistureMapping.jsx";
import ExoplanetLogin from "./pages/ExoplanetLogin.jsx";
import CompanionCroppingPage from "./pages/CompanionCroppingPage.jsx";
import AgroforestryPage from "./pages/AgroforestryPage.jsx";
import CoverCropping from "./pages/CoverCroppingPage.jsx";
import EVI from "./pages/EVI.jsx";
import GLI from "./pages/GLI.jsx";
import VARI from "./pages/VARI.jsx";
import EXG from "./pages/EXG.jsx";
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NDaF5cWGJCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWH9ecnRSQmNcV01zX0A="
);
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<App />} />
      <Route path="/farming-simulator" element={<FarmingSimulatorPage />} />
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route
          path="crop-recommendation"
          element={<CropRecommendationPage />}
        />
        <Route
          path="fertilizers-recommendation"
          element={<FertilizersRecommendationPage />}
        />
        <Route path="plant-growth-stage" element={<PlantGrowthStagePage />} />
        <Route
          path="crop-yield-prediction"
          element={<CropYieldPredictionPage />}
        />
        <Route
          path="plant-disease-detection"
          element={<PlantDiseaseDetectionPage />}
        />
        <Route path="pest-detection" element={<PestDetectionPage />} />
        <Route path="farming-calendar" element={<CalendarApp />} />
        <Route
          path="farming-scheduler-creation-form"
          element={<FarmingSchedulerCreationForm />}
        />
        <Route
          path="farming-simulator-creation-form"
          element={<FarmSimulatorCreatorForm />}
        />
        <Route
          path="soil-moisture-monitoring"
          element={<SoilMoistureMonitoringPage />}
        />
        <Route
          path="air-temperature-and-humidity-monitoring"
          element={<AirTemperatureAndHumidityMonitoringPage />}
        />
        <Route
          path="soil-temperature-monitoring"
          element={<SoilTemperatureMonitoring />}
        />
        <Route
          path="soil-ph-and-water-ph-monitoring"
          element={<SoilPHAndWaterPHMonitoringPage />}
        />
        <Route path="yo" element={<AnamolyDetection />} />
        <Route
          path="farm-monitoring-history"
          element={<FarmMonitoringHistoryPage />}
        />
        <Route path="budget" element={<BudgetPage />} />
        <Route path="why" element={<NDVI />} />
        <Route path="soil-map" element={<SoilMoistureMapping />} />
        <Route path="login" element={<ExoplanetLogin />} />
        <Route path="companion-cropping" element={<CompanionCroppingPage />} />
        <Route path="agro" element={<AgroforestryPage />} />
        <Route path="cover" element={<CoverCropping />} />
        <Route path="evi" element={<EVI />} />
        <Route path="gli" element={<GLI />} />
        <Route path="vari" element={<VARI />} />
        <Route path="exg" element={<EXG />} />
      </Route>
      <Route
        path="exoplanet-exploration"
        element={<ExoplanetExplorationPage />}
      />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

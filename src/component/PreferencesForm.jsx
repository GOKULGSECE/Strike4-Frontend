import React, { useState } from "react";
import { Checkbox, Button, Card } from "antd";
import "../styles/preferences.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updatePreferences } from "../redux/preferenceSlice";
import { message} from 'antd';

const preferencesData = {
  "General Financial Preferences": [
    "Market Trends",
    "Inflation & Interest Rates",
    "Personal Finance Tips",
    "Financial Literacy",
    "Budgeting & Saving",
    "Tax Planning & Regulations",
    "Banking & Loans",
    "Credit Scores & Credit Cards",
    "Insurance (Health, Life, Vehicle)",
    "Retirement Planning",
  ],
  "Investment-Specific Preferences": [
    "Stock Market Updates",
    "Mutual Funds & ETFs",
    "Bonds & Fixed Income",
    "Cryptocurrency & Blockchain",
    "Commodities (Gold, Oil, etc.)",
    "Real Estate Investments",
    "IPOs & New Listings",
    "Forex & Currency Exchange",
    "Hedge Funds & Alternative Investments",
    "High-Frequency Trading (HFT)",
    "Derivatives (Futures & Options)",
  ],
  "Business & Economy Preferences": [
    "Global & National Economic News",
    "Corporate Earnings Reports",
    "Startup & Venture Capital",
    "Mergers & Acquisitions (M&A)",
    "Government Policies & Regulations",
    "Central Bank Announcements",
    "Fintech & AI in Finance",
    "Sustainable & ESG Investing",
    "Consumer Spending Trends",
  ],
};

const categoryKeys = Object.keys(preferencesData);

const PreferencesForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedPreferences = useSelector((state) => state.preference.preferences);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  const currentCategory = categoryKeys[currentCategoryIndex];

  const handleCheckboxChange = (checkedValues) => {
    dispatch(updatePreferences({ [currentCategory]: checkedValues }));
  };

  const handleNext = () => {
    if (currentCategoryIndex < categoryKeys.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
    }
  };

  const handleSubmit = () => {
    setTimeout(()=>{
        message.success("Completed the intial prefereneces")
        navigate('/homepage')
        console.log("Final Preferences Submitted:", selectedPreferences);
    },2000)
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <Card title="Select Your Financial Preferences">
        <h3>{currentCategory}</h3>
        <Checkbox.Group
          options={preferencesData[currentCategory]}
          value={selectedPreferences[currentCategory] || []}
          onChange={handleCheckboxChange}
        />

        <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handlePrevious} disabled={currentCategoryIndex === 0}>
            Previous
          </Button>
          {currentCategoryIndex < categoryKeys.length - 1 ? (
            <Button type="primary" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PreferencesForm;

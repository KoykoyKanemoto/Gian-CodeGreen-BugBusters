import { useState } from "react";
import { toast } from "react-toastify";
import useCheckLicenseNumber from "../hooks/car-hooks/useCheckLicenseNumber";

const useSendNotification = () => {
  const [licenseNumber, setLicenseNumber] = useState<string>("");
  const [licenseError, setLicenseError] = useState<string>("");
  // const [licenseExists, setLicenseExists] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const { checkLicenseNumber } = useCheckLicenseNumber();

  const handleCheckLicense = async () => {
    try {
      if (!licenseNumber.trim()) {
        toast.error("License Number is required.");
        return;
      }

      const driverData = await checkLicenseNumber(licenseNumber.trim());
      if (!driverData) {
        setLicenseError("This license number does not exist in our records.");
        return;
      }

      // Set driver data and clear error
      // setLicenseExists(driverData);
      setLicenseError("");
      setCurrentStep(2);  // Move to the next step
    } catch (error) {
      console.error("Error checking license number:", error);
      setLicenseError("An error occurred while checking the license number.");
    }
  };

  return {
    licenseNumber,
    setLicenseNumber,
    licenseError,
    // licenseExists,
    currentStep,
    setCurrentStep,
    handleCheckLicense,
  };
};

export default useSendNotification;

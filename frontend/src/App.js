import { useEffect, useState } from "react";
import { Button, Input, Table } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { API } from "aws-amplify/api";
import awsExports from "./amplifyconfiguration";

Amplify.configure(awsExports);

const DealerLookup = () => {
  const [dealers, setDealers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchDealers();
  }, []);

  const fetchDealers = async () => {
    try {
      const response = await API.get("DealerApi", "/dealers");
      setDealers(response);
    } catch (error) {
      console.error("Error fetching dealers:", error);
    }
  };

  const refreshDealers = async () => {
    try {
      await API.post("DealerApi", "/dealers/refresh", {});
      fetchDealers();
    } catch (error) {
      console.error("Error refreshing dealers:", error);
    }
  };

  return (
    <div>
      <h1>Dealer Lookup</h1>
      <Input
        placeholder="Search anything..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button onClick={refreshDealers}>Refresh Dealers Data</Button>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>ZIP</th>
          </tr>
        </thead>
        <tbody>
          {dealers
            .filter((dealer) =>
              Object.values(dealer).some((field) =>
                field.toString().toLowerCase().includes(searchQuery.toLowerCase())
              )
            )
            .map((dealer, index) => (
              <tr key={index}>
                <td>{dealer.id}</td>
                <td>{dealer.name}</td>
                <td>{dealer.address}</td>
                <td>{dealer.city}</td>
                <td>{dealer.state}</td>
                <td>{dealer.zip}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DealerLookup;

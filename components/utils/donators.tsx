import React, { useEffect, useState } from "react";
import { API_URL } from "@/utils/api";
import { Donation } from "@/utils/types";
import { Paper, Text, Stack, Group, Title, Card } from "@mantine/core";

interface Props {
  donation: Donation | null;
}

const Donators: React.FC<Props> = ({ donation }) => {
  const [donationData, setDonationData] = useState<Donation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Network response was not ok");
        setDonationData(await response.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Set up an interval to fetch data every 2 seconds
    const intervalId = setInterval(fetchData, 2000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const totalAmount = donationData.reduce((total, donation) => total + donation.amount, 0);

  return (
    <Card withBorder shadow="xs" bg="gray.3">
      <Group mb={20}>
        <Title order={1} color="gray">
          Total
        </Title>
        <Title order={1} variant="gradient">
          {totalAmount}
        </Title>
        <Title order={1} color="gray">
          THB
        </Title>
      </Group>
      <Stack>
        {donationData.map((donation, index) => (
          <Paper key={index} shadow="xs" p="md">
            <Text>{donation.firstName}</Text>
            <Text>{donation.lastName}</Text>
            <Text>{donation.email}</Text>
            <Text>{donation.amount}</Text>
            <Text>{donation.time}</Text>
          </Paper>
        ))}
      </Stack>
    </Card>
  );
};

export default Donators;

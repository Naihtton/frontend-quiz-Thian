import React, { useState } from "react";
import { Input, Button, Card, Title, Stack } from "@mantine/core";

interface FormErrors {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  donationAmount: boolean;
}

export default function Form() {
  // Define state variables for form inputs and errors
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [donationAmount, setDonationAmount] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({
    firstName: false,
    lastName: false,
    email: false,
    donationAmount: false,
  });

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form inputs
    const isValid = validateForm();

    if (isValid) {
      // Process the form data here
      console.log("Form submitted:", {
        firstName,
        lastName,
        email,
        donationAmount,
      });

      // Clear form inputs
      setFirstName("");
      setLastName("");
      setEmail("");
      setDonationAmount("");
    }
  };

  // Function to validate form inputs
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const errorsCopy = { ...errors };

    // Check if fields are empty
    if (!firstName.trim()) errorsCopy.firstName = true;
    else errorsCopy.firstName = false;

    if (!lastName.trim()) errorsCopy.lastName = true;
    else errorsCopy.lastName = false;

    if (!email.match(emailRegex)) errorsCopy.email = true;
    else errorsCopy.email = false;

    if (!donationAmount.trim() || isNaN(parseFloat(donationAmount)) || +donationAmount <= 1000)
      errorsCopy.donationAmount = true;
    else errorsCopy.donationAmount = false;

    setErrors(errorsCopy);

    // Check if there are any errors
    return !Object.values(errorsCopy).some((error) => error);
  };

  return (
    <Card withBorder shadow="xs" p="xl" bg="cyan.2">
      <Title order={1} color="blue">
        Donate
      </Title>

      <form onSubmit={handleSubmit}>
        <Stack spacing={"xs"}>
          <Input.Wrapper>
            <Input.Label>First Name</Input.Label>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={errors.firstName}
              required
            />
            {errors.firstName && <Input.Error>This field is required.</Input.Error>}
          </Input.Wrapper>

          <Input.Wrapper>
            <Input.Label>Last Name</Input.Label>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={errors.lastName}
              required
            />
            {errors.lastName && <Input.Error>This field is required.</Input.Error>}
          </Input.Wrapper>

          <Input.Wrapper>
            <Input.Label>Email</Input.Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              required
            />
            {errors.email && <Input.Error>Please enter a valid email.</Input.Error>}
          </Input.Wrapper>

          <Input.Wrapper>
            <Input.Label>Donation Amount</Input.Label>
            <Input
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              error={errors.donationAmount}
              required
            />
            {errors.donationAmount && (
              <Input.Error>
                Please enter a valid amount (greater than 1000).
              </Input.Error>
            )}
          </Input.Wrapper>

          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Card>
  );
}

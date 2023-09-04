import { API_URL } from "../utils/api";
import { type Donation } from "@/utils/types";
import { Paper, Text, Stack, Group, Title, Card } from "@mantine/core";
import dayjs from "dayjs";
import Donators from "./utils/donators";

export default function Donation() {
  return (<>
  <Donators donation={null}  />
  </>
  );
}
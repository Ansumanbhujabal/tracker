import React, { useState, useEffect } from 'react';
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  Container,
  Heading,
  Text,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ChakraProvider,
  Center,
  useColorMode,
} from '@chakra-ui/react';
import { XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserAccountDrawer from './UserAccountDrawer';

const PeriodTrackerApp = () => {
  const { colorMode } = useColorMode();

  const textColor = colorMode === 'dark' ? 'white' : 'gray.800';

  const [cycleData, setCycleData] = useState({
    startDate: '',
    endDate: '',
    flowIntensity: '',
    symptoms: '',
    mood: '',
    cycleLength: '',
    cycleRegular: '',
  });

  const [cycleHistory, setCycleHistory] = useState([]);
  const [averageCycleLength, setAverageCycleLength] = useState(NaN);
  const [showStatistics, setShowStatistics] = useState(false);

  const [isUserAccountDrawerOpen, setIsUserAccountDrawerOpen] = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCycleData({ ...cycleData, [name]: value });
  };

  const validateCycleData = () => {
    if (cycleData.startDate === '' || cycleData.endDate === '') {
      toast.error('Please enter both start and end dates.');
      return false;
    }

    const startDate = new Date(cycleData.startDate);
    const endDate = new Date(cycleData.endDate);

    if (startDate >= endDate) {
      toast.error('Start date must be before the end date.');
      return false;
    }

    if (
      isNaN(cycleData.cycleLength) ||
      parseInt(cycleData.cycleLength) <= 0
    ) {
      toast.error('Cycle length must be a positive integer.');
      return false;
    }

    return true;
  };

  const handleSaveData = () => {
    if (validateCycleData()) {
      const updatedCycleHistory = [...cycleHistory, cycleData];
      setCycleHistory(updatedCycleHistory);

      const cycleLengths = updatedCycleHistory.map((cycle) =>
        parseInt(cycle.cycleLength)
      );
      const averageLength =
        cycleLengths.reduce((total, length) => total + length, 0) /
        cycleLengths.length;
      setAverageCycleLength(isNaN(averageLength) ? NaN : averageLength.toFixed(1));

      setCycleData({
        startDate: '',
        endDate: '',
        flowIntensity: '',
        symptoms: '',
        mood: '',
        cycleLength: '',
        cycleRegular: '',
      });
    }
  };

  const cycleTrendsData = [
    { x: 1, y: 28 },
    { x: 2, y: 30 },
    { x: 3, y: 27 },
    { x: 4, y: 29 },
    { x: 5, y: 31 },
    { x: 6, y: 28 },
  ];

  useEffect(() => {
    if (cycleHistory.length > 0) {
      const cycleLengths = cycleHistory.map((cycle) =>
        parseInt(cycle.cycleLength)
      );
      const averageLength =
        cycleLengths.reduce((total, length) => total + length, 0) /
        cycleLengths.length;
      setAverageCycleLength(isNaN(averageLength) ? NaN : averageLength.toFixed(1));
    }
  }, [cycleHistory]);

  const setReminder = () => {
    if (isNaN(averageCycleLength)) {
      toast.error("Average cycle length is not available.");
      return;
    }

    const lastCycle = cycleHistory[cycleHistory.length - 1];

    if (!lastCycle) {
      toast.error("No cycle data available to set a reminder.");
      return;
    }

    const lastCycleStartDate = new Date(lastCycle.startDate);
    const reminderDaysBefore = 3;

    const nextCycleStartDate = new Date(
      lastCycleStartDate.getTime() +
      averageCycleLength * 24 * 60 * 60 * 1000
    );

    const today = new Date();
    const remainingDays = Math.ceil((nextCycleStartDate - today) / (24 * 60 * 60 * 1000));

    if (remainingDays < 0) {
      toast.error("Next cycle is already here!");
    } else {
      toast.info(`Next cycle is approaching in ${remainingDays} days!`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  };

  const [cycleNotes, setCycleNotes] = useState(Array(cycleHistory.length).fill(''));
  const updateCycleNote = (index, newNote) => {
    const updatedNotes = [...cycleNotes];
    updatedNotes[index] = newNote;
    setCycleNotes(updatedNotes);
  };

  return (
    <ChakraProvider >
      <Box bgGradient="linear(to-b, teal.300, teal.500)" color="white" py={6} textAlign="center">
        <Heading as="h1" size="xl">
          Period Tracker
        </Heading>
        <Text fontSize="lg" mt={2}>
          Track your menstrual cycle with ease.
        </Text>
        <Button colorScheme="teal" mt={4} onClick={() => setIsUserAccountDrawerOpen(true)}>
          Account
        </Button>
        <Button
          colorScheme="teal"
          onClick={() => setShowStatistics(!showStatistics)}
          mt={4}
          ml={5}
        >
          {showStatistics ? 'Hide Statistics' : 'Show Statistics'}
        </Button>
        <Button mt={4} ml={5} colorScheme="teal" onClick={setReminder}>
          Set Reminder
        </Button>
      </Box>

      <Container maxW="lg" py={6}  >
        <Box display="flex" >
          {showStatistics ? null : (
            <Center flex="1">
              <Box
                bg="grey.800"
                p={6}
                boxShadow="md"
                borderRadius="lg"
                borderWidth="1px"
                width="600px"
              >
                <FormControl>
                  <FormLabel>Start Date</FormLabel>
                  <Input
                    type="date"
                    name="startDate"
                    value={cycleData.startDate}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>End Date</FormLabel>
                  <Input
                    type="date"
                    name="endDate"
                    value={cycleData.endDate}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Flow Intensity</FormLabel>
                  <Select
                    name="flowIntensity"
                    placeholder="Select flow intensity"
                    value={cycleData.flowIntensity}
                    onChange={handleInputChange}
                  >
                    <option value="Light">Light</option>
                    <option value="Medium">Medium</option>
                    <option value="Heavy">Heavy</option>
                  </Select>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Symptoms</FormLabel>
                  <Input
                    type="text"
                    name="symptoms"
                    placeholder="Cramps, Headache, etc."
                    value={cycleData.symptoms}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Mood</FormLabel>
                  <Input
                    type="text"
                    name="mood"
                    placeholder="Happy, Sad, etc."
                    value={cycleData.mood}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Cycle Length (in days)</FormLabel>
                  <Input
                    type="number"
                    name="cycleLength"
                    value={cycleData.cycleLength}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Regular Cycle?</FormLabel>
                  <Select
                    name="cycleRegular"
                    placeholder="Select"
                    value={cycleData.cycleRegular}
                    onChange={handleInputChange}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </Select>
                </FormControl>

                <Button
                  mt={6}
                  colorScheme="teal"
                  onClick={handleSaveData}
                  width="100%"
                >
                  Save Data
                </Button>
              </Box>
            </Center>
          )}

          <Box flex="1">
            {showStatistics && (
              <VStack align="start" spacing={6}>
                <Heading as="h2" size="lg">
                  Your Cycle Statistics
                </Heading>
                <Box w="100%">
                  <Stat>
                    <StatLabel>Average Cycle Length</StatLabel>
                    <StatNumber>
                      {isNaN(averageCycleLength) ? 'N/A' : averageCycleLength} days
                    </StatNumber>
                  </Stat>
                </Box>
                <Box w="100%">
                  <Heading as="h3" size="md" mb={4}>
                    Cycle Length Trends
                  </Heading>
                  <XYPlot width={400} height={300}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis title="Cycle" />
                    <YAxis title="Cycle Length (days)" />
                    <LineSeries data={cycleTrendsData} />
                  </XYPlot>
                </Box>

                <Center>
                  <Box w="100%">
                    <Heading as="h3" size="md" mb={4}>
                      Cycle History
                    </Heading>
                    <Table variant="striped" colorScheme="teal">
                      <Thead>
                        <Tr>
                          <Th>Start Date</Th>
                          <Th>End Date</Th>
                          <Th>Cycle Length (days)</Th>
                          <Th>Flow Intensity</Th>
                          <Th>Symptoms</Th>
                          <Th>Mood</Th>
                          <Th>Regular Cycle</Th>
                          <Th>Notes</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {cycleHistory.map((cycle, index) => (
                          <Tr key={index}>
                            <Td>{cycle.startDate}</Td>
                            <Td>{cycle.endDate}</Td>
                            <Td>{cycle.cycleLength}</Td>
                            <Td>{cycle.flowIntensity}</Td>
                            <Td>{cycle.symptoms}</Td>
                            <Td>{cycle.mood}</Td>
                            <Td>{cycle.cycleRegular}</Td>
                            <Td>
                              <Input
                                type="text"
                                width="200px"
                                value={cycleNotes[index] || ''}
                                onChange={(e) => updateCycleNote(index, e.target.value)}
                                placeholder="Add note"
                              />
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Box>
                </Center>
              </VStack>
            )}
          </Box>
        </Box>
      </Container>
      <ToastContainer />
      <UserAccountDrawer isOpen={isUserAccountDrawerOpen} onClose={() => setIsUserAccountDrawerOpen(false)} />
    </ChakraProvider>
  );
};

export default PeriodTrackerApp;

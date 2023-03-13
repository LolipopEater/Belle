import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Platform,
} from "react-native";
import { List, Checkbox } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeArea } from "../../components/utility/safe-area.component";
import { PartnerSchedulerContext } from "../services/schedulaer/partner.scheduler.context";
import { parseWorkingHours } from "../services/schedulaer/partner.scheduler.service";
export const HoursScreen = () => {
  const { updateWorkinghours, working_hours } = useContext(
    PartnerSchedulerContext
  );
  const [days, setDays] = useState([
    {
      name: "Sunday",
      startTime: "09:00",
      endTime: "17:00",
      disabled: false,
      isDatePickerVisibleStart: false,
      isDatePickerVisibleEnd: false,
    },
    {
      name: "Monday",
      startTime: "09:00",
      endTime: "17:00",
      disabled: false,
      isDatePickerVisibleStart: false,
      isDatePickerVisibleEnd: false,
    },
    {
      name: "Tuesday",
      startTime: "09:00",
      endTime: "17:00",
      disabled: false,
      isDatePickerVisibleStart: false,
      isDatePickerVisibleEnd: false,
    },
    {
      name: "Wednesday",
      startTime: "09:00",
      endTime: "17:00",
      disabled: false,
      isDatePickerVisibleStart: false,
      isDatePickerVisibleEnd: false,
    },
    {
      name: "Thursday",
      startTime: "09:00",
      endTime: "17:00",
      disabled: false,
      isDatePickerVisibleStart: false,
      isDatePickerVisibleEnd: false,
    },
    {
      name: "Friday",
      startTime: "09:00",
      endTime: "17:00",
      disabled: false,
      isDatePickerVisibleStart: false,
      isDatePickerVisibleEnd: false,
    },
    {
      name: "Saturday",
      startTime: "09:00",
      endTime: "17:00",
      disabled: false,
      isDatePickerVisibleStart: false,
      isDatePickerVisibleEnd: false,
    },
  ]);

  const showDatePicker = (pickerIndex = 0, stat) => {
    setDays((prev) => {
      return prev.map((day, index) => {
        if (index === pickerIndex) {
          return {
            ...day,
            [stat]: true,
          };
        }
        return day;
      });
    });
  };

  const hideDatePicker = (pickerIndex = 0, stat) => {
    setDays((prev) => {
      return prev.map((day, index) => {
        if (index === pickerIndex) {
          return {
            ...day,
            [stat]: false,
          };
        }
        return day;
      });
    });
  };

  const handleConfirmStart = (date, index) => {
    const timeString = `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`; // shows 00:00 proceeding '0' is included
    console.log("This is confirm Start!");
    setDays((days) => {
      return days.map((day, pickerIndex) => {
        if (index === pickerIndex) {
          return {
            ...day,
            startTime: timeString,
          };
        }
        return day;
      });
    });
    hideDatePicker(index, "isDatePickerVisibleStart");
  };

  const handleConfirmEnd = (date, index) => {
    const timeString = `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`; // shows 00:00 proceeding '0' is included

    console.log("This is confirm End!");
    setDays((days) => {
      return days.map((day, pickerIndex) => {
        if (index === pickerIndex) {
          return {
            ...day,
            endTime: timeString,
          };
        }
        return day;
      });
    });
    hideDatePicker(index, "isDatePickerVisibleEnd");
  };

  const toggleDay = (index) => {
    setDays((days) => {
      return days.map((day, i) => {
        if (i === index) {
          return {
            ...day,
            disabled: !day.disabled,
          };
        }
        return day;
      });
    });
  };
  const renderDay = (day, index) => {
    const date = new Date();

    return (
      <List.Item
        title={day.name}
        titleStyle={styles.titleStyle}
        right={() => (
          <View style={styles.row}>
            <View style={styles.timeButtonContainer}>
              <Button
                title={day.startTime}
                onPress={() =>
                  showDatePicker(index, "isDatePickerVisibleStart")
                }
                disabled={day.disabled}
                color={day.disabled ? "gray" : "purple"}
              />
              <DateTimePickerModal
                isVisible={day.isDatePickerVisibleStart}
                mode="time"
                onConfirm={(date) => handleConfirmStart(date, index)}
                onCancel={() =>
                  hideDatePicker(index, "isDatePickerVisibleStart")
                }
              />
            </View>

            <View style={styles.timeButtonContainerEnd}>
              <Button
                title={day.endTime}
                onPress={() => showDatePicker(index, "isDatePickerVisibleEnd")}
                disabled={day.disabled}
                color={day.disabled ? "gray" : "purple"}
              />
              <DateTimePickerModal
                isVisible={day.isDatePickerVisibleEnd}
                mode="time"
                onConfirm={(date) => handleConfirmEnd(date, index)}
                onCancel={() => hideDatePicker(index, "isDatePickerVisibleEnd")}
              />
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={day.disabled ? "checked" : "unchecked"}
                onPress={() => toggleDay(index)}
                color="purple"
              />
            </View>
          </View>
        )}
      />
    );
  };

  const handleSubmit = () => {
    updateWorkinghours(days);
  };

  useEffect(() => {
    setDays(parseWorkingHours(working_hours));
  }, []);
  return (
    <SafeArea>
      <View style={styles.container}>
        <Text style={styles.title}>Set your Working hours</Text>

        <View style={styles.row}>
          <Text style={styles.header}>Day</Text>
          <Text style={styles.header}>From</Text>
          <Text style={styles.header}>To</Text>
          <Text style={styles.header}>Not Working</Text>
        </View>

        {days.map((day, index) => (
          <React.Fragment key={index}>
            <List.Section>{renderDay(day, index)}</List.Section>
          </React.Fragment>
        ))}
        <View style={styles.submitContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  header: {
    fontWeight: "bold",
    fontSize: 18,
  },
  timeButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -25,
    marginRight: Platform.OS === "android" ? 175 : 65,
  },
  timeButtonContainerEnd: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -25,
    marginRight: Platform.OS === "android" ? 175 : 65,
  },
  timeButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "gray",
    marginRight: 26,
  },
  timeButtonText: {
    fontSize: 16,
  },
  timeText: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  submitButton: {
    backgroundColor: "purple",
    padding: 12,
    borderRadius: 6,
    marginTop: 0,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
  },
  checkboxContainer: {
    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: 3,
    padding: 5,
  },
  checkboxContainer: {
    borderWidth: 0.5,
    borderRadius: 3,
    padding: 5,
  },
});

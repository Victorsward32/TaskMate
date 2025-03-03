import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
//- whole componet created by---//
const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weeks, setWeeks] = useState([]);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(5);
  const scrollRef = useRef(null);

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const subDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const startOfWeek = (date) => {
    const result = new Date(date);
    const day = result.getDay();
    const diff = result.getDate() - day + (day === 0 ? -6 : 1);
    result.setDate(diff);
    return result;
  };

  const generateWeekDays = (startDate) => {
    return Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  };

  useEffect(() => {
    const today = new Date();
    const weeksToShow = [];
    let currentStart = startOfWeek(subDays(today, 35));

    for (let i = 0; i < 11; i++) {
      weeksToShow.push({ id: i, days: generateWeekDays(currentStart) });
      currentStart = addDays(currentStart, 7);
    }

    setWeeks(weeksToShow);

    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ x: currentWeekIndex * 300, animated: true });
      }
    }, 100);
  }, []);

  const formatDate = (date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return {
      day: days[date.getDay()].charAt(0),
      date: date.getDate(),
      fullDate: `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`,
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Today</Text>
        <Text style={styles.headerDate}>{formatDate(new Date()).fullDate}</Text>
      </View>
      <View style={styles.weekContainer}>
        <TouchableOpacity
          onPress={() => {
            if (currentWeekIndex > 0) {
              setCurrentWeekIndex(currentWeekIndex - 1);
              scrollRef.current.scrollTo({ x: (currentWeekIndex - 1) * 300, animated: true });
            }
          }}
          disabled={currentWeekIndex === 0}
        >
          <Text style={styles.arrow}>{"<"}</Text>
        </TouchableOpacity>

        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {weeks.map((week, weekIndex) => (
            <View key={week.id} style={styles.weekView}>
              {week.days.map((day, dayIndex) => {
                const isToday = isSameDay(day, new Date());
                const isPast = day < new Date();
                const isFuture = day > new Date();

                return (
                  <TouchableOpacity
                    key={dayIndex}
                    disabled={!isToday}
                    onPress={() => isToday && setSelectedDate(day)}
                    style={[styles.dayButton, isToday && styles.todayButton, isPast && styles.pastDate, isFuture && styles.futureDate]}
                  >
                    <Text style={[styles.dayText,isToday && {color:'white'}]}>{formatDate(day).day}</Text>
                    <Text style={[styles.dateText ,isToday && {color:'white'}]}>{formatDate(day).date}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity
          onPress={() => {
            if (currentWeekIndex < weeks.length - 1) {
              setCurrentWeekIndex(currentWeekIndex + 1);
              scrollRef.current.scrollTo({ x: (currentWeekIndex + 1) * 300, animated: true });
            }
          }}
          disabled={currentWeekIndex === weeks.length - 1}
        >
          <Text style={styles.arrow}>{">"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#ffb703", padding: 20, borderRadius:20, },
  header: { marginBottom: 20 },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "Black", },
  headerDate: { fontSize: 14, color: "black",fontWeight:'600',lineHeight:20 },
  weekContainer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  arrow: { fontSize: 24, padding: 10, color: "black" },
  scrollContainer: { alignItems: "center" },
  weekView: { flexDirection: "row", justifyContent: "space-around", width: 300 },
  dayButton: { alignItems: "center", paddingHorizontal: 10,paddingVertical:5, borderRadius: 8 , borderWidth:0.5},
  todayButton: { backgroundColor: "black", color: "white",paddingHorizontal:15 },
  pastDate: { color: "gray" },
  futureDate: { color: "lightgray" },
  dayText: { fontSize: 12, marginBottom: 5 },
  dateText: { fontSize: 16, fontWeight: "bold" },
});

export default CalendarComponent;

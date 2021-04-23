import useCalendar from '@hooks/calendar'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { toggleCalendarModal } from '@reducers/modal'
import { endOfDay, format, startOfDay, subDays, subYears } from 'date-fns'
import React, { FC, useMemo } from 'react'
import {
  Calendar,
  CalendarProps,
  DateCallbackHandler
} from 'react-native-calendars'
import Modal, { ReactNativeModal } from 'react-native-modal'
import styled from 'styled-components/native'

const minDate = subYears(new Date(), 3)

const CalendarModal: FC = () => {
  const isVisible = useAppSelector(({ modal }) => modal.calendar)
  const dispatch = useAppDispatch()
  const { selectedDate, selectDate } = useCalendar()

  const onDayPress: DateCallbackHandler = async ({ timestamp }) => {
    selectDate(new Date(timestamp))
    const startDate = startOfDay(subDays(timestamp, 1)).toISOString()
    const endDate = endOfDay(timestamp).toISOString()
    // dispatch(fetchSle(startDate, endDate)) FIXME
  }

  const toggleModal = () => {
    dispatch(toggleCalendarModal(true))
  }

  const { markedDates } = useMemo(
    () => ({
      markedDates: {
        [format(new Date(selectedDate), 'yyyy-MM-dd')]: {
          selected: true
        }
      }
    }),
    [selectedDate]
  )

  const getMonthData: DateCallbackHandler = ({ month, year }) => {
    dispatch()
    // fetchSleepData(
    //   new Date(year, month - 1, 1).toISOString(),
    //   new Date(year, month - 1, 0).toISOString()
    // ) FIXME
  }

  return (
    <StyledModal
      backdropTransitionOutTiming={0}
      hideModalContentWhileAnimating
      isVisible={isVisible}
      useNativeDriver={false}
      onBackdropPress={toggleModal}>
      <Container>
        <ThemedCalendar
          onMonthChange={getMonthData}
          hideExtraDays
          minDate={minDate}
          markedDates={markedDates}
          showWeekNumbers
          maxDate={new Date()}
          enableSwipeMonths
          onDayPress={onDayPress}
        />
      </Container>
    </StyledModal>
  )
}

export default CalendarModal

const StyledModal = styled(Modal)<ReactNativeModal>`
  margin: 0px 0px;
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  top: 0px;
  justify-content: flex-end;
`

const Container = styled.View`
  justify-content: space-between;
  padding: 20px 20px;
  background-color: ${({ theme }) => theme.bgSecondary};
`

export const ThemedCalendar = styled(Calendar).attrs(({ theme }) => ({
  theme: {
    backgroundColor: theme.bgSecondary,
    calendarBackground: theme.bgSecondary,
    textSectionTitleColor: '#b6c1cd',
    textSectionTitleDisabledColor: '#d9e1e8',
    selectedDayBackgroundColor: theme.buttonPrimary,
    selectedDayTextColor: '#ffffff',
    todayTextColor: theme.buttonPrimary,
    dayTextColor: theme.textSecondary,
    textDisabledColor: '#d9e1e8',
    dotColor: '#00adf5',
    selectedDotColor: '#ffffff',
    arrowColor: theme.buttonPrimary,
    disabledArrowColor: theme.bgSecondary,
    monthTextColor: theme.textSecondary,
    indicatorColor: 'blue',
    textDayFontFamily: theme.medium,
    textMonthFontFamily: theme.medium,
    textDayHeaderFontFamily: theme.medium,
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16
  }
}))<CalendarProps>`
  height: 350px;
`

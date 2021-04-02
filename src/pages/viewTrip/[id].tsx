import {
  Container,
  DatePickerWrap,
  DPDown,
  Form,
  FormContent,
  FormGroup,
  FormInnerGroup,
  InnerForm,
  Label,
  LabelQuestion,
  Main,
  RadioButton,
  RadioButtonGroup,
  StyledLoader,
} from 'components/common'
import Input from 'components/FormComponents/Input'
import Heading from 'components/Heading'
import Sidebar from 'components/Sidebar'
import SidebarCard from 'components/SidebarCard'
import { TripContext } from 'contexts/TripContext'
import moment from 'moment'
import { GetServerSideProps, NextPage } from 'next'
import React, { useContext, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { api } from 'services/httpService'

const xValues = [5000, -40, 0]

const ViewTrip: NextPage<{ id: string }> = ({ id }) => {
  const [state, dispatch] = useContext(TripContext)

  useEffect(() => {
    const fetchTrip = async () => {
      const { data } = await api.get(`/trip/${id}`)
      dispatch({ type: 'SET_FORM', payload: data })
    }
    fetchTrip()
  }, [id, dispatch])

  let startDate =
    state.form.start_date !== ''
      ? moment(state.form.start_date, 'YYYY-MM-DD').utc(false).toDate()
      : ''

  let endDate =
    state.form.end_date !== '' ? moment(state.form.end_date, 'YYYY-MM-DD').utc(false).toDate() : ''

  return (
    <Container>
      <Main>
        <Heading title='View trip' />
        <Form>
          <FormContent>
            <InnerForm>
              <FormGroup>
                <DPDown animate={{ x: xValues }} transition={{ duration: 1 }}>
                  <Label htmlFor='countries'>Where do you want to go</Label>
                  <Dropdown
                    disabled
                    // required
                    className={`flag-${state.form.address.country}`}
                    // id='country'
                    // name='country'
                    options={state.countries}
                    placeholder={state.form.address.country || 'Select country'}
                    value={state.form.address.country}
                  />
                </DPDown>
              </FormGroup>

              <FormGroup>
                <FormInnerGroup
                  animate={{ x: xValues, opacity: [0, 0.3, 1] }}
                  transition={{ duration: 1, delay: 0.1 }}
                >
                  <Label htmlFor='startDate'>Start date</Label>
                  <DatePickerWrap>
                    <DatePicker
                      disabled
                      required
                      selected={typeof startDate === 'string' ? undefined : startDate}
                      onChange={(date) => {
                        dispatch({
                          type: 'SET_StartDate',
                          payload: {
                            start_date: date,
                          },
                        })
                      }}
                      // date={true}
                      id='startDate'
                      name='startDate'
                      placeholderText='dd. mm. year'
                      showPopperArrow={false}
                      selectsStart
                      showMonthYearDropdown
                      dateFormat='dd. MM. yyyy'
                      minDate={moment().toDate()}
                    />
                  </DatePickerWrap>
                </FormInnerGroup>

                <FormInnerGroup animate={{ x: xValues }} transition={{ duration: 1, delay: 0.2 }}>
                  <Label htmlFor='endDate'>End date</Label>
                  <DatePickerWrap>
                    <DatePicker
                      disabled
                      required
                      selected={typeof endDate === 'string' ? undefined : endDate}
                      onChange={(date) => {
                        dispatch({
                          type: 'SET_EndDate',
                          payload: {
                            end_date: date,
                          },
                        })
                      }}
                      id='endDate'
                      name='endDate'
                      placeholderText='dd. mm. year'
                      dateFormat='dd. MM. yyyy'
                      minDate={moment().toDate()}
                      showTwoColumnMonthYearPicker
                      showPopperArrow={false}
                    />
                  </DatePickerWrap>
                </FormInnerGroup>
              </FormGroup>

              <FormGroup>
                <FormInnerGroup animate={{ x: xValues }} transition={{ duration: 1, delay: 0.3 }}>
                  <Input
                    name='company'
                    label='Company name'
                    value={state.form.company_name}
                    placeholder='Type here ...'
                    disabled
                  />
                </FormInnerGroup>

                <FormInnerGroup animate={{ x: xValues }} transition={{ duration: 1, delay: 0.4 }}>
                  <Input
                    name='city'
                    label='City'
                    value={state.form.address.city}
                    placeholder='Type here ...'
                    disabled
                  />
                </FormInnerGroup>

                <FormInnerGroup animate={{ x: xValues }} transition={{ duration: 1, delay: 0.5 }}>
                  <Input
                    name='street'
                    label='Street'
                    value={state.form.address.street}
                    placeholder='Type here ...'
                    disabled
                  />
                </FormInnerGroup>

                <FormInnerGroup animate={{ x: xValues }} transition={{ duration: 1, delay: 0.6 }}>
                  <Input
                    name='streetNumber'
                    label='Street Number'
                    placeholder='Type here ...'
                    value={state.form.address.street_num}
                    disabled
                  />
                </FormInnerGroup>

                <FormInnerGroup animate={{ x: xValues }} transition={{ duration: 1, delay: 0.7 }}>
                  <Input
                    name='zipCode'
                    label='Zip code'
                    value={state.form.address.zip}
                    placeholder='Type here ...'
                    disabled
                  />
                </FormInnerGroup>
              </FormGroup>

              <FormGroup>
                <LabelQuestion>
                  Have you been recently tested for <strong>COVID-19</strong>
                </LabelQuestion>

                <RadioButtonGroup animate={{ x: xValues }} transition={{ duration: 1, delay: 0.8 }}>
                  <RadioButton>
                    <input
                      disabled
                      required
                      type='radio'
                      name='testedCovid'
                      id='yes'
                      value='0'
                      checked={state.form.covid === true}
                    />
                    <div />
                    <span>Yes</span>
                  </RadioButton>

                  <RadioButton>
                    <input
                      required
                      disabled
                      type='radio'
                      name='testedCovid'
                      id='no'
                      value='1'
                      checked={state.form.covid === false}
                    />
                    <div />
                    <span>No</span>
                  </RadioButton>
                </RadioButtonGroup>
              </FormGroup>
            </InnerForm>
          </FormContent>
        </Form>
      </Main>
      <Sidebar sidebarHeading='Trips'>
        {state.trips.length > 0 ? (
          state.trips.map((trip) => (
            <SidebarCard
              key={trip.id}
              country={trip.address.country}
              company={trip.company_name}
              address={`${trip.address.street} ${trip.address.street_num} ${trip.address.zip} ${trip.address.city}`}
              date={`${moment(trip.start_date).format('D MMM')} - ${moment(trip.end_date).format(
                'D MMM, YYYY',
              )}`}
              id={trip.id}
            />
          ))
        ) : (
          <StyledLoader type='BallTriangle' color='var(--accent)' />
        )}
      </Sidebar>
    </Container>
  )
}

export default ViewTrip

export const getServerSideProps: GetServerSideProps<any, any> = async ({ params: { id } }) => {
  return {
    props: {
      id,
    },
  }
}

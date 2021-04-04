import Check from 'assets/Check.svg'
import Anchor from 'components/Anchor'
import {
  Button,
  Container,
  DatePickerWrap,
  DPDown,
  Form,
  FormContent,
  FormFooter,
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
import SVGIcon from 'components/SVGIcon'
import { TripContext } from 'contexts/TripContext'
import { motion } from 'framer-motion'
import moment from 'moment'
import React, { ChangeEvent, FormEventHandler, useContext, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import Modal from 'react-modal'
import { api } from 'services/httpService'
import styled from 'styled-components'
import { customStyles } from 'utils/style/customStyles'

const xValues = [5000, -40, 0]

const NewTrip = () => {
  const [state, dispatch] = useContext(TripContext)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [endDateMin, setEndDateMin] = useState(moment().toDate())
  const [endDateVal, setEndDateVal] = useState<string | Date>('')

  const addNewTrip: FormEventHandler = async (e) => {
    e.preventDefault()
    let resp
    try {
      resp = await api.post('/trip', state.form)
      dispatch({ type: 'ADD_TRIP', payload: { ...state.form, id: resp.data.id } })
      setIsOpen(true)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    dispatch({ type: 'SET_INITIAL' })
  }, [dispatch])

  let startDate =
    state.form.start_date !== '' ? moment(state.form.start_date, 'YYYY-MM-DD').toDate() : ''

  return (
    <Container>
      <Main>
        <Heading title='New trip' />
        <Modal isOpen={modalIsOpen} style={customStyles} onRequestClose={() => setIsOpen(false)}>
          <Form
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Label htmlFor='q' style={{ textAlign: 'center' }}>
              Data Uploaded Successfully
            </Label>
            <FormButtonGroup>
              <Anchor href='/'>
                <AcceptDeleteButton
                  whileHover={{
                    scale: 1.15,
                    translateY: -10,
                    boxShadow: '3px 3px 5px rgba(0,0,0,0.3)',
                  }}
                >
                  OK
                </AcceptDeleteButton>
              </Anchor>
            </FormButtonGroup>
          </Form>
        </Modal>
        <Form onSubmit={addNewTrip}>
          <FormContent>
            <InnerForm>
              <FormGroup>
                <DPDown animate={{ x: xValues }} transition={{ duration: 1 }}>
                  <Label htmlFor='countries'>Where do you want to go</Label>
                  <Dropdown
                    // required
                    className={state.selectedCountry}
                    // id='country'
                    // name='country'
                    options={state.countries}
                    placeholder='Select country'
                    onChange={(data) => {
                      dispatch({
                        type: 'SET_SELECTED_COUNTRY',
                        payload: data.value,
                      })
                    }}
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
                      required
                      selected={typeof startDate === 'string' ? undefined : startDate}
                      onChange={(date) => {
                        let nextDay = moment(date as any)
                          .add(1, 'day')
                          .toDate()
                        setEndDateMin(nextDay)
                        if (moment(state.form.end_date) <= moment(date as any)) {
                          setEndDateVal('')
                          dispatch({
                            type: 'SET_EndDate',
                            payload: {
                              end_date: '',
                            },
                          })
                        }
                        dispatch({
                          type: 'SET_StartDate',
                          payload: {
                            start_date: moment(date as any).format('YYYY-MM-DD'),
                          },
                        })
                      }}
                      // date
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
                      required
                      selected={typeof endDateVal === 'string' ? undefined : endDateVal}
                      onChange={(date) => {
                        setEndDateVal(moment(date as any).toDate())
                        dispatch({
                          type: 'SET_EndDate',
                          payload: {
                            end_date: moment(date as any).format('YYYY-MM-DD'),
                          },
                        })
                      }}
                      id='endDate'
                      name='endDate'
                      placeholderText='dd. mm. year'
                      dateFormat='dd. MM. yyyy'
                      minDate={endDateMin}
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
                    placeholder='Type here ...'
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      dispatch({
                        type: 'SET_CompanyName',
                        payload: {
                          company_name: e.target.value,
                        },
                      })
                    }}
                  />
                </FormInnerGroup>

                <FormInnerGroup animate={{ x: xValues }} transition={{ duration: 1, delay: 0.4 }}>
                  <Input
                    name='city'
                    label='City'
                    placeholder='Type here ...'
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      dispatch({
                        type: 'SET_CITY',
                        payload: {
                          address: {
                            city: e.target.value,
                          },
                        },
                      })
                    }}
                  />
                </FormInnerGroup>

                <FormInnerGroup animate={{ x: xValues }} transition={{ duration: 1, delay: 0.5 }}>
                  <Input
                    name='street'
                    label='Street'
                    placeholder='Type here ...'
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      dispatch({
                        type: 'SET_Street',
                        payload: {
                          address: {
                            street: e.target.value,
                          },
                        },
                      })
                    }}
                  />
                </FormInnerGroup>

                <FormInnerGroup animate={{ x: xValues }} transition={{ duration: 1, delay: 0.6 }}>
                  <Input
                    name='streetNumber'
                    label='Street Number'
                    placeholder='Type here ...'
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      dispatch({
                        type: 'SET_StreetNumber',
                        payload: {
                          address: {
                            street_num: Number(e.target.value),
                          },
                        },
                      })
                    }}
                  />
                </FormInnerGroup>

                <FormInnerGroup animate={{ x: xValues }} transition={{ duration: 1, delay: 0.7 }}>
                  <Input
                    name='zipCode'
                    label='Zip code'
                    placeholder='Type here ...'
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      dispatch({
                        type: 'SET_ZIP',
                        payload: {
                          address: {
                            zip: e.target.value,
                          },
                        },
                      })
                    }}
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
                      required
                      type='radio'
                      name='testedCovid'
                      id='yes'
                      value='0'
                      onChange={() => {
                        dispatch({
                          type: 'SET_Covid',
                          payload: {
                            covid: true,
                          },
                        })
                      }}
                    />
                    <div />
                    <span>Yes</span>
                  </RadioButton>

                  <RadioButton>
                    <input
                      required
                      type='radio'
                      name='testedCovid'
                      id='no'
                      value='1'
                      onChange={() => {
                        dispatch({
                          type: 'SET_Covid',
                          payload: {
                            covid: false,
                          },
                        })
                      }}
                    />
                    <div />
                    <span>No</span>
                  </RadioButton>
                </RadioButtonGroup>
              </FormGroup>
            </InnerForm>
          </FormContent>

          <FormFooter>
            <Button type='submit'>
              Save
              <SVGIcon icon={Check} width={16} height={12} />
            </Button>
          </FormFooter>
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

export default NewTrip

const FormButtonGroup = styled.div`
  flex-direction: row;
`
const AcceptDeleteButton = styled(motion.div)`
  background: red;
  font-size: 1.6rem;
  padding: 1.3rem 2rem;
  margin: 1.2rem;
  max-width: 200px;
  border-radius: 10px;
  font-weight: 600;
  text-align: left;
  display: inline-block;
  align-items: center;
  cursor: pointer;
  color: white;

  > svg {
    margin-left: auto;
  }
`

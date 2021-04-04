import { Meta, Story } from '@storybook/react'
import { default as TripRow, ITripRowProps } from 'components/TripRow'
import TripProvider from 'contexts/TripContext'
import moment from 'moment'
import React from 'react'
import GlobalStyle from 'utils/style/global'

export default {
  title: 'Components/TripRow',
  component: TripRow,
} as Meta

const Template: Story<ITripRowProps> = (args) => (
  <>
    <GlobalStyle />
    <TripProvider>
      <TripRow {...args} />
    </TripProvider>
  </>
)

export const Primary = Template.bind({})
Primary.args = {
  id: 'id',
  address: `some address`,
  company: 'NA',
  country: 'at',
  date: `${moment(new Date()).format('D MMM')} - ${moment(new Date()).format('D MMM, YYYY')}`,
} as ITripRowProps

import { Meta, Story } from '@storybook/react'
import SidebarCard, { ISidebarCardProps } from 'components/SidebarCard'
import React from 'react'
import GlobalStyle from 'utils/style/global'

export default {
  title: 'Components/SidebarCard',
  component: SidebarCard,
} as Meta

const Template: Story<ISidebarCardProps> = (args) => (
  <>
    <GlobalStyle />
    <SidebarCard {...args} />
  </>
)

export const Primary = Template.bind({})
Primary.args = {
  address: 'address',
  company: 'NA',
  country: 'at',
  date: 'date',
  id: 'id',
}

import { Meta, Story } from '@storybook/react'
import NavMenu from 'components/NavMenu'
import MenuProvider from 'contexts/MenuContext'
import React from 'react'
import GlobalStyle from 'utils/style/global'

export default {
  title: 'Components/NavMenu',
  component: NavMenu,
} as Meta

const Template: Story<{}> = (args) => (
  <>
    <GlobalStyle />

    <MenuProvider>
      <NavMenu {...args} />
    </MenuProvider>
  </>
)

export const Primary = Template.bind({})

import { render } from '@testing-library/react'
import { Provider } from 'pages/_app'
// import { FC } from 'react'
// import { ThemeProvider } from "my-ui-lib"
// import { TranslationProvider } from "my-i18n-lib"
// import defaultStrings from "i18n/en-x-default"

// const Providers: FC = ({ children }) => {
//   return <>{children}</>
// return (
//   <ThemeProvider theme="light">
//     <TranslationProvider messages={defaultStrings}>
//       {children}
//     </TranslationProvider>
//   </ThemeProvider>
// )
// }

const customRender = (ui: any, options = {}) => render(ui, { wrapper: Provider, ...options })

// re-export everything
export * from '@testing-library/react'
// override render method
export { customRender as render }

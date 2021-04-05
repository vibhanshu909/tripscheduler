export const customStyles = {
  content: {
    top: '45%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
  },
} /* the `as const` tells the typescript compiler to treat this object as a readonly constant, thus preventing any code that tries to mutate this object anywhere is your source code. */ as const

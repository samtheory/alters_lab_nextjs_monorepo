import * as React from 'react';
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean };
export function Button({ children, loading, ...rest }: Props) {
  return (
    <button className='px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 transition' {...rest}>
      {loading ? '…' : children}
    </button>
  );
}
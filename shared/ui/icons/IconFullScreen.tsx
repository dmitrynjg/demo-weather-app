import { FC } from 'react';
import { SVGProps } from 'react';

export const IconFullScreen: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    xmlSpace='preserve'
    viewBox='0 0 512 512'
    {...props}
    fill='currentColor'
  >
    <path d='M0 0v512h512V0H0zm477.867 477.867H34.133V34.133h443.733v443.734z' />
    <path d='M126.533 102.4h72.578V68.267H68.267v130.844H102.4v-72.573l96.022 96.02 24.134-24.135zM222.557 313.581l-24.135-24.136-96.022 96.022v-72.578H68.267v130.844h130.844V409.6h-72.573zM409.6 312.889v72.578l-96.022-96.023-24.134 24.134 96.018 96.022h-72.573v34.133h130.844V312.889zM312.889 68.267V102.4h72.578l-96.023 96.023 24.134 24.135 96.022-96.02v72.573h34.133V68.267z' />
  </svg>
);

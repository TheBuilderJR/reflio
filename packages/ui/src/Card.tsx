import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";

export const Card = (props: { secondary?: any; className?: string; children?: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) => {

  let styles = 'shadow-lg rounded-xl max-w-3xl border-4';

  if(props.secondary){
    styles = styles + ' bg-secondary border-secondary-2';
  } else {
    styles = styles + ' bg-white border-gray-200';
  }

  if(props.className){
    styles = styles + ' ' + props.className;
  }

  return(
    <div className={styles}>
      <div className="p-6 sm:p-8">
        {props.children}
      </div>
    </div>
  )
};

export default Card;
import React from "react";

type CustomIconProps = React.SVGProps<SVGSVGElement>;

export const YolidayLogo: React.FC<CustomIconProps> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 23.4844C5.65734 23.4844 0.515625 18.3427 0.515625 12C0.515625 5.65734 5.65734 0.515625 12 0.515625C18.3427 0.515625 23.4844 5.65734 23.4844 12C23.4844 18.3427 18.3427 23.4844 12 23.4844ZM12 22.6641C17.8896 22.6641 22.6641 17.8896 22.6641 12C22.6641 6.11039 17.8896 1.33594 12 1.33594C6.11039 1.33594 1.33594 6.11039 1.33594 12C1.33594 17.8896 6.11039 22.6641 12 22.6641Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.11328 8.07334C3.60477 6.89795 4.31 6.21475 4.50043 6.0215C4.69086 5.82838 4.96121 5.9226 5.14226 6.0215C5.32332 6.12053 9.86176 10.6663 10.0644 10.8946C10.2669 11.1229 10.4816 11.4635 9.90019 11.4635C9.31871 11.4635 3.60629 11.4135 3.11328 11.3795C2.62016 11.3454 2.47461 11.0579 2.47461 10.8122C2.47461 10.5666 2.62168 9.24885 3.11328 8.07334ZM8.60375 3.01635C9.78254 2.53271 10.6229 2.56447 10.8942 2.5626C11.1655 2.56072 11.2899 2.81842 11.348 3.01635C11.4061 3.21439 11.4482 9.6767 11.4301 9.98127C11.4118 10.286 11.4168 10.6238 11.0057 10.2126C10.5945 9.8015 6.59047 5.72689 6.26598 5.35424C5.94137 4.98146 6.0418 4.67514 6.21559 4.50146C6.38926 4.32779 7.42484 3.5001 8.60375 3.01635ZM15.8098 3.11279C16.9852 3.60428 17.6684 4.30951 17.8617 4.49994C18.0548 4.69037 17.9606 4.96072 17.8617 5.14178C17.7627 5.32283 13.2168 9.86127 12.9886 10.0639C12.7603 10.2664 12.4197 10.4811 12.4197 9.89971C12.4197 9.31822 12.4696 3.6058 12.5036 3.11279C12.5377 2.61967 12.8253 2.47412 13.0709 2.47412C13.3166 2.47412 14.6343 2.62119 15.8098 3.11279ZM20.8668 8.60326C21.3505 9.78205 21.3187 10.6224 21.3206 10.8937C21.3225 11.165 21.0648 11.2894 20.8668 11.3476C20.6688 11.4056 14.2065 11.4478 13.9019 11.4296C13.5972 11.4113 13.2594 11.4163 13.6706 11.0053C14.0817 10.594 18.1563 6.58998 18.5289 6.26549C18.9017 5.94088 19.208 6.04131 19.3817 6.2151C19.5554 6.38877 20.3831 7.42435 20.8668 8.60326ZM20.7704 15.9265C20.2789 17.1019 19.5737 17.7851 19.3832 17.9784C19.1928 18.1715 18.9225 18.0773 18.7414 17.9784C18.5603 17.8794 14.0219 13.3335 13.8193 13.1053C13.6168 12.877 13.4021 12.5364 13.9835 12.5364C14.565 12.5364 20.2774 12.5863 20.7704 12.6203C21.2635 12.6544 21.4091 12.942 21.4091 13.1876C21.4091 13.4333 21.262 14.751 20.7704 15.9265ZM15.2799 20.9835C14.1011 21.4672 13.2608 21.4354 12.9895 21.4373C12.7182 21.4392 12.5937 21.1815 12.5356 20.9835C12.4776 20.7855 12.4354 14.3232 12.4536 14.0186C12.4719 13.7139 12.4668 13.3761 12.8779 13.7873C13.2891 14.1984 17.2932 18.273 17.6177 18.6456C17.9423 19.0184 17.8419 19.3247 17.6681 19.4984C17.4944 19.6721 16.4587 20.4998 15.2798 20.9835H15.2799ZM8.07383 20.8871C6.89844 20.3956 6.21523 19.6904 6.02199 19.4999C5.82887 19.3095 5.92309 19.0392 6.02199 18.8581C6.12101 18.677 10.6668 14.1386 10.8951 13.936C11.1234 13.7335 11.4639 13.5188 11.4639 14.1002C11.4639 14.6817 11.414 20.3941 11.38 20.8871C11.3459 21.3802 11.0584 21.5258 10.8127 21.5258C10.5671 21.5258 9.24933 21.3787 8.07383 20.8871ZM3.01684 15.3966C2.5332 14.2178 2.56496 13.3775 2.56309 13.1062C2.56121 12.8349 2.81891 12.7104 3.01684 12.6523C3.21488 12.5943 9.67719 12.5521 9.98176 12.5703C10.2864 12.5886 10.6243 12.5835 10.2131 12.9946C9.80199 13.4058 5.72738 17.4099 5.35473 17.7344C4.98195 18.059 4.67562 17.9586 4.50195 17.7848C4.32828 17.6111 3.50059 16.5754 3.01684 15.3965V15.3966Z"
        fill="currentColor"
      />
    </svg>
  );
};

const Sprites = () => {
    return (
        <svg style={{ display: "none" }}>
            <defs>
                <symbol id="tick-logo">
                    <path d="M14 2L5.75 11L2 6.90909" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </symbol>
                <symbol id="ig-footer">
                    <path d="M29.9491 15.8798C29.9021 14.815 29.7299 14.0869 29.4833 13.4527C29.2288 12.7794 28.8373 12.1805 28.3284 11.6794C27.8274 11.1705 27.2206 10.7751 26.559 10.5285C25.9209 10.2819 25.1967 10.1096 24.1319 10.0626C23.0593 10.0117 22.7187 10 20.002 10C17.2852 10 16.9446 10.0117 15.8798 10.0587C14.815 10.1057 14.0869 10.2779 13.4527 10.5246C12.7794 10.779 12.1805 11.1705 11.6794 11.6794C11.1705 12.1805 10.7751 12.7872 10.5285 13.4488C10.2819 14.0869 10.1096 14.8111 10.0626 15.8759C10.0117 16.9485 10 17.2891 10 20.002C10 22.7148 10.0117 23.0593 10.0587 24.1241C10.1057 25.1889 10.2779 25.917 10.5246 26.5512C10.779 27.2245 11.1744 27.8235 11.6794 28.3245C12.1805 28.8334 12.7872 29.2288 13.4488 29.4754C14.0869 29.7221 14.8111 29.8943 15.8759 29.9413C16.9407 29.9883 17.2813 30 19.998 30C22.7148 30 23.0554 29.9883 24.1202 29.9413C25.185 29.8943 25.9131 29.7221 26.5473 29.4754C27.89 28.9548 28.9548 27.8939 29.4754 26.5473C29.7221 25.9092 29.8943 25.185 29.9413 24.1202C29.9883 23.0515 30 22.7148 30 19.998C30 17.2813 29.9961 16.9485 29.9491 15.8798ZM28.1484 24.0497C28.1053 25.0284 27.9409 25.5529 27.8039 25.9053C27.4672 26.7782 26.7743 27.4672 25.9053 27.8039C25.5529 27.9409 25.0206 28.1053 24.0497 28.1484C22.9928 28.1953 22.6796 28.2071 20.0098 28.2071C17.34 28.2071 17.019 28.1953 15.9699 28.1484C14.9912 28.1053 14.4666 27.9409 14.1143 27.8039C13.6798 27.6434 13.2844 27.3889 12.9673 27.0562C12.6346 26.7313 12.3801 26.3398 12.2196 25.9092C12.0826 25.5569 11.9182 25.0245 11.8751 24.0536C11.8281 22.9967 11.8164 22.6835 11.8164 20.0137C11.8164 17.3439 11.8281 17.0229 11.8751 15.9738C11.9182 14.9951 12.0826 14.4705 12.2196 14.1182C12.3762 13.6798 12.6307 13.2883 12.9673 12.9673C13.2922 12.6346 13.6837 12.3801 14.1143 12.2196C14.4666 12.0826 14.999 11.9182 15.9699 11.8751C17.0268 11.8281 17.34 11.8164 20.0098 11.8164C22.6835 11.8164 23.0006 11.8281 24.0497 11.8751C25.0284 11.9182 25.5529 12.0826 25.9053 12.2196C26.3398 12.3801 26.7352 12.6346 27.0523 12.9673C27.385 13.2922 27.6395 13.6837 27.8 14.1182C27.937 14.4705 28.1014 15.0029 28.1445 15.9738C28.1914 17.0307 28.2032 17.3439 28.2032 20.0137C28.2032 22.6835 28.1953 22.9928 28.1484 24.0497Z" fill="white" />
                    <path d="M20.002 14.8659C17.1638 14.8659 14.862 17.1677 14.862 20.0059C14.862 22.844 17.1638 25.1458 20.002 25.1458C22.8401 25.1458 25.1419 22.844 25.1419 20.0059C25.1419 17.1677 22.8401 14.8659 20.002 14.8659ZM20.002 23.3373C18.1621 23.3373 16.6667 21.8458 16.6667 20.002C16.6667 18.1582 18.1582 16.6667 20.002 16.6667C21.8418 16.6667 23.3372 18.1582 23.3372 20.002C23.3372 21.8458 21.8458 23.3373 20.002 23.3373Z" fill="white" />
                    <path d="M26.5473 14.6624C26.5473 15.3239 26.011 15.8602 25.3494 15.8602C24.6878 15.8602 24.1515 15.3239 24.1515 14.6624C24.1515 14.0008 24.6878 13.4645 25.3494 13.4645C26.007 13.4606 26.5473 14.0008 26.5473 14.6624Z" fill="white" />
                </symbol>

                <symbol id="fb-footer">
                    <path d="M18.0093 21.2871C17.5325 21.2871 17.0884 21.2871 16.6508 21.2871C16.2655 21.2871 15.8866 21.2936 15.5013 21.2806C15.1355 21.2675 15.0049 21.15 15.0049 20.7907C14.9984 19.7588 14.9984 18.7203 15.0049 17.6883C15.0114 17.3226 15.1486 17.205 15.5274 17.205C16.2524 17.1985 16.9774 17.205 17.7024 17.205C17.7938 17.205 17.8787 17.205 18.0028 17.205C18.0028 17.094 18.0028 17.0025 18.0028 16.9045C18.0224 15.9706 17.9897 15.03 18.0616 14.096C18.2445 11.9342 19.8512 10.2686 22.0131 10.0662C23.13 9.96167 24.2599 10.0139 25.3833 10.0074C25.638 10.0074 25.7817 10.1511 25.7817 10.4058C25.7882 11.4182 25.7882 12.424 25.7817 13.4364C25.7817 13.7238 25.625 13.8413 25.2853 13.8479C24.6387 13.8609 23.9986 13.8674 23.352 13.874C23.2736 13.874 23.1887 13.874 23.1104 13.8805C22.5879 13.9262 22.2809 14.1875 22.2613 14.71C22.2286 15.5134 22.2548 16.3167 22.2548 17.1527C22.3462 17.1527 22.4376 17.1527 22.5225 17.1527C23.3716 17.1527 24.2142 17.1527 25.0633 17.1527C25.5596 17.1527 25.6903 17.2834 25.6903 17.7732C25.6903 18.7529 25.6903 19.7261 25.6903 20.7058C25.6903 21.1434 25.5727 21.2545 25.1416 21.261C24.273 21.2675 23.3977 21.261 22.5291 21.261C22.4442 21.261 22.3527 21.261 22.2417 21.261C22.2417 21.3851 22.2417 21.4765 22.2417 21.5745C22.2417 24.1217 22.2417 26.6755 22.2417 29.2228C22.2417 29.9282 22.1698 30 21.4514 30C20.5174 30 19.5769 30 18.6429 30C18.14 30 18.0224 29.8759 18.0224 29.3795C18.0224 26.7866 18.0224 24.2001 18.0224 21.6072C18.0093 21.5092 18.0093 21.4177 18.0093 21.2871Z" />
                </symbol>

                <symbol id="tg-footer">
                    <path d="M16.8472 22.9858L16.5151 27.6387C16.9878 27.6387 17.1949 27.4355 17.441 27.1894L19.66 25.0681L24.2582 28.4357C25.1021 28.9045 25.6959 28.6584 25.9225 27.6582L28.9424 13.512C29.2119 12.2697 28.4931 11.7813 27.6727 12.09L9.92837 18.8837C8.71729 19.3525 8.73682 20.0284 9.72132 20.3331L14.257 21.7435L24.7934 15.1489C25.2896 14.8208 25.7389 15.0005 25.3677 15.3325L16.8472 22.9858Z" />
                </symbol>

                <symbol id="location">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.25 0.818176C17.3504 0.818176 21.5 4.99918 21.5 10.1388C21.5 16.4568 14.2615 22.6818 12.25 22.6818C10.2385 22.6818 3 16.4568 3 10.1388C3 4.99918 7.14961 0.818176 12.25 0.818176ZM12.25 2.49999C8.07685 2.49999 4.68182 5.92754 4.68182 10.1388C4.68182 15.4971 10.9875 20.7174 12.25 20.9955C13.5125 20.7163 19.8182 15.496 19.8182 10.1388C19.8182 5.92754 16.4232 2.49999 12.25 2.49999ZM12.2511 6.42424C14.2603 6.42424 15.8951 8.05896 15.8951 10.0693C15.8951 12.0785 14.2603 13.7121 12.2511 13.7121C10.2419 13.7121 8.60718 12.0785 8.60718 10.0693C8.60718 8.05896 10.2419 6.42424 12.2511 6.42424ZM12.2511 8.10606C11.1692 8.10606 10.289 8.98621 10.289 10.0693C10.289 11.1513 11.1692 12.0303 12.2511 12.0303C13.3331 12.0303 14.2132 11.1513 14.2132 10.0693C14.2132 8.98621 13.3331 8.10606 12.2511 8.10606Z" fill="#7B54C9" />
                </symbol>

                <symbol id="mail">
                    <path d="M18.5984 4.79999C19.3941 4.79999 20.1571 5.11606 20.7198 5.67867C21.2824 6.24128 21.5984 7.00434 21.5984 7.79999V17.4C21.5984 18.1956 21.2824 18.9587 20.7198 19.5213C20.1571 20.0839 19.3941 20.4 18.5984 20.4H5.39844C4.60279 20.4 3.83973 20.0839 3.27712 19.5213C2.71451 18.9587 2.39844 18.1956 2.39844 17.4V7.79999C2.39844 7.00434 2.71451 6.24128 3.27712 5.67867C3.83973 5.11606 4.60279 4.79999 5.39844 4.79999H18.5984ZM20.3984 9.55319L12.3032 14.3172C12.2267 14.3621 12.1412 14.3895 12.0528 14.3974C11.9644 14.4053 11.8753 14.3935 11.792 14.3628L11.6936 14.3172L3.59844 9.55559V17.4C3.59844 17.8774 3.78808 18.3352 4.12565 18.6728C4.46321 19.0103 4.92105 19.2 5.39844 19.2H18.5984C19.0758 19.2 19.5337 19.0103 19.8712 18.6728C20.2088 18.3352 20.3984 17.8774 20.3984 17.4V9.55319ZM18.5984 5.99999H5.39844C4.92105 5.99999 4.46321 6.18963 4.12565 6.5272C3.78808 6.86476 3.59844 7.3226 3.59844 7.79999V8.16239L11.9984 13.104L20.3984 8.15999V7.79999C20.3984 7.3226 20.2088 6.86476 19.8712 6.5272C19.5337 6.18963 19.0758 5.99999 18.5984 5.99999V5.99999Z" fill="#7B54C9" stroke="#7B54C9" strokeWidth="0.5" />
                </symbol>

                <symbol id="phone-handset">
                    <path d="M10.5542 6.24003L7.17123 2.33503C6.78123 1.88503 6.06623 1.88703 5.61323 2.34103L2.83123 5.12803C2.00323 5.95703 1.76623 7.18803 2.24523 8.17503C5.10685 14.1 9.88528 18.8851 15.8062 21.755C16.7922 22.234 18.0222 21.997 18.8502 21.168L21.6582 18.355C22.1132 17.9 22.1142 17.181 21.6602 16.791L17.7402 13.426C17.3302 13.074 16.6932 13.12 16.2822 13.532L14.9182 14.898C14.8484 14.9712 14.7565 15.0195 14.6566 15.0354C14.5567 15.0513 14.4543 15.0339 14.3652 14.986C12.1357 13.7021 10.2862 11.8503 9.00523 9.61903C8.95726 9.52978 8.93989 9.42726 8.95578 9.32719C8.97168 9.22711 9.01996 9.13502 9.09323 9.06503L10.4532 7.70403C10.8652 7.29003 10.9102 6.65103 10.5542 6.24003Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </symbol>

                <symbol id="dash">
                    <path xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" d="M2.5 10C2.5 9.83424 2.56585 9.67527 2.68306 9.55806C2.80027 9.44085 2.95924 9.375 3.125 9.375H16.875C17.0408 9.375 17.1997 9.44085 17.3169 9.55806C17.4342 9.67527 17.5 9.83424 17.5 10C17.5 10.1658 17.4342 10.3247 17.3169 10.4419C17.1997 10.5592 17.0408 10.625 16.875 10.625H3.125C2.95924 10.625 2.80027 10.5592 2.68306 10.4419C2.56585 10.3247 2.5 10.1658 2.5 10Z" />
                </symbol>

                <symbol id="computer-logo">
                    <path d="M2 5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H20C20.5304 3 21.0391 3.21071 21.4142 3.58579C21.7893 3.96086 22 4.46957 22 5V16C22 16.5304 21.7893 17.0391 21.4142 17.4142C21.0391 17.7893 20.5304 18 20 18H13V20H16C16.2652 20 16.5196 20.1054 16.7071 20.2929C16.8946 20.4804 17 20.7348 17 21C17 21.2652 16.8946 21.5196 16.7071 21.7071C16.5196 21.8946 16.2652 22 16 22H8C7.73478 22 7.48043 21.8946 7.29289 21.7071C7.10536 21.5196 7 21.2652 7 21C7 20.7348 7.10536 20.4804 7.29289 20.2929C7.48043 20.1054 7.73478 20 8 20H11V18H4C3.46957 18 2.96086 17.7893 2.58579 17.4142C2.21071 17.0391 2 16.5304 2 16V5ZM20 16V5H4V16H20Z" strokeWidth="0.5" />
                </symbol>

                <symbol id="phone-logo">
                    <path d="M10.5 1.5H8.25C7.65326 1.5 7.08097 1.73705 6.65901 2.15901C6.23705 2.58097 6 3.15326 6 3.75V20.25C6 20.8467 6.23705 21.419 6.65901 21.841C7.08097 22.2629 7.65326 22.5 8.25 22.5H15.75C16.3467 22.5 16.919 22.2629 17.341 21.841C17.7629 21.419 18 20.8467 18 20.25V3.75C18 3.15326 17.7629 2.58097 17.341 2.15901C16.919 1.73705 16.3467 1.5 15.75 1.5H13.5M10.5 1.5V3H13.5V1.5M10.5 1.5H13.5M10.5 20.25H13.5" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </symbol>

                <symbol id="footer-logo">
                    <path d="M68.7113 0H72.4709C76.5839 0.420217 81.2139 1.23899 83.9163 4.70614C86.0191 7.2982 86.358 10.8188 85.9004 14.0101C85.1777 18.0361 84.0235 21.9928 82.7186 25.8657C81.1748 30.0029 78.636 33.948 74.8735 36.3899C70.6519 39.2245 65.4036 40.1112 60.3941 39.8368C57.3992 39.6289 54.3101 39.1119 51.696 37.5552C49.1472 36.156 47.3716 33.5653 46.8083 30.7365C45.9538 26.413 47.4469 22.1184 48.5983 17.9971C49.8872 12.8881 52.1479 7.72996 56.368 4.3639C59.8134 1.50325 64.3203 0.33935 68.7113 0ZM68.7041 8.29892C66.6794 8.56607 65.1023 10.1964 64.2942 11.9827C62.846 15.252 62.3261 18.8318 61.2602 22.2296C60.7562 24.8289 59.3166 27.4715 60.2956 30.1314C61.2819 32.0058 63.922 31.9596 65.5759 31.0152C68.3623 29.3993 69.043 25.9682 69.8047 23.1134C70.5578 20.1733 71.3688 17.2477 72.1494 14.3134C72.4999 12.9126 72.8344 11.3545 72.2696 9.9639C71.8322 8.5083 70.0408 8.07509 68.7041 8.29892Z" fill="white" />
                    <path d="M145.323 0H149.082C151.663 0.323466 154.318 0.58917 156.696 1.74007C159.24 2.89242 161.428 5.07581 162.18 7.8065C163.217 11.1004 162.593 14.6267 161.74 17.8874C160.648 21.3762 160.025 25.044 158.297 28.3061C156.62 31.8758 153.976 35.0527 150.529 37.0325C146.683 39.2635 142.131 40.0318 137.724 39.857C134.25 39.7213 130.609 39.1711 127.677 37.174C125.24 35.5682 123.659 32.8318 123.302 29.961C122.819 25.9726 124.073 22.1242 125.113 18.335C126.5 12.9675 128.816 7.47726 133.388 4.05054C136.778 1.39495 141.094 0.319134 145.323 0ZM145.456 8.28736C142.674 8.59783 141.021 11.2318 140.264 13.6765C139.176 17.4773 138.187 21.3097 137.16 25.1292C136.714 26.7841 136.189 28.657 137.056 30.2744C138.067 32.0188 140.512 31.8397 142.118 31.0917C144.057 30.013 145.036 27.8715 145.686 25.8527C146.72 22.0549 147.711 18.2455 148.748 14.4462C149.124 13.0975 149.386 11.6433 149.011 10.2643C148.72 8.70036 146.898 7.98412 145.456 8.28736Z" fill="white" />
                    <path d="M10.1637 0.443088C14.8762 0.421427 19.5888 0.435868 24.3013 0.435868C20.8096 13.4207 17.3426 26.4142 13.8596 39.4019C9.28461 39.4438 4.7082 39.4221 0.13324 39.412C2.08545 31.4496 4.41131 23.5637 6.39249 15.6055C4.53152 16.742 2.30993 17.1348 0.152067 17.0424C0.941352 13.8207 1.86243 10.6323 2.65751 7.4106C2.75599 7.00626 2.9486 6.47775 3.56555 6.72468C6.97323 6.47486 9.29185 3.49868 10.1637 0.443088Z" fill="white" />
                    <path d="M34.52 0.451831C39.2355 0.417174 43.9523 0.427282 48.6678 0.44461C45.2862 13.4193 41.7786 26.3796 38.2695 39.3168C33.7727 39.5594 29.0544 39.3616 24.4736 39.415C26.6185 31.4829 28.7575 23.5493 30.8502 15.6027C28.9805 16.7146 26.7734 17.145 24.6127 17.0352C25.4164 13.6128 26.3448 10.2193 27.2731 6.83017C30.8546 6.7493 33.7684 3.82656 34.52 0.451831Z" fill="white" />
                    <path d="M88.7766 0.440365C93.2139 0.430257 97.6513 0.423036 102.089 0.443253C102.394 10.0201 102.38 19.5999 102.693 29.1754C103.143 29.236 103.121 28.6295 103.305 28.3479C107.31 19.0498 111.205 9.70101 115.291 0.438921C120.022 0.433145 124.755 0.418704 129.486 0.444697C123.014 13.431 116.606 26.4707 110.037 39.4079C103.828 39.4295 97.6165 39.4382 91.4094 39.405C90.3725 26.4303 89.7353 13.4238 88.7766 0.440365Z" fill="white" />
                    <path d="M170.347 0.453378C174.933 0.417277 179.521 0.421609 184.108 0.451934C182.415 2.0476 180.618 3.54652 178.972 5.1884C180.237 5.21728 181.504 5.17684 182.773 5.20572C180.8 13.1696 178.455 21.0685 176.402 29.0223C179.443 29.0469 182.486 28.9963 185.527 29.0368C184.623 32.4996 183.678 35.9552 182.751 39.4137C175.127 39.4267 167.502 39.431 159.879 39.4122C163.263 26.4115 166.799 13.4151 170.347 0.453378Z" fill="white" />
                    <path d="M189.119 0.448886C199.744 0.405565 210.373 0.453218 221 0.425781V0.658272C220.043 3.66621 219.329 6.74925 218.509 9.79618C215.491 9.88426 212.468 9.75575 209.452 9.84094C206.799 19.6821 204.112 29.529 201.557 39.4005C196.939 39.4496 192.319 39.4164 187.702 39.4164C190.216 29.5334 193.075 19.724 195.517 9.83084C192.516 9.78029 189.515 9.85827 186.516 9.80629C186.9 8.2756 187.371 6.76369 187.741 5.22723C189.08 5.12614 190.428 5.24744 191.773 5.18535C191.052 3.52759 189.86 2.09654 189.119 0.448886Z" fill="white" />
                </symbol>

                <symbol id="home">
                    <path d="M8.15722 19.7714V16.7047C8.1572 15.9246 8.79312 15.2908 9.58101 15.2856H12.4671C13.2587 15.2856 13.9005 15.9209 13.9005 16.7047V16.7047V19.7809C13.9003 20.4432 14.4343 20.9845 15.103 21H17.0271C18.9451 21 20.5 19.4607 20.5 17.5618V17.5618V8.83784C20.4898 8.09083 20.1355 7.38935 19.538 6.93303L12.9577 1.6853C11.8049 0.771566 10.1662 0.771566 9.01342 1.6853L2.46203 6.94256C1.86226 7.39702 1.50739 8.09967 1.5 8.84736V17.5618C1.5 19.4607 3.05488 21 4.97291 21H6.89696C7.58235 21 8.13797 20.4499 8.13797 19.7714V19.7714" />
                </symbol>

                <symbol id="menu">
                    <path d="M2.66669 6C2.66669 5.73478 2.77204 5.48043 2.95958 5.29289C3.14712 5.10536 3.40147 5 3.66669 5H21.6667C21.9319 5 22.1863 5.10536 22.3738 5.29289C22.5613 5.48043 22.6667 5.73478 22.6667 6C22.6667 6.26522 22.5613 6.51957 22.3738 6.70711C22.1863 6.89464 21.9319 7 21.6667 7H3.66669C3.40147 7 3.14712 6.89464 2.95958 6.70711C2.77204 6.51957 2.66669 6.26522 2.66669 6ZM2.66669 12.032C2.66669 11.7668 2.77204 11.5124 2.95958 11.3249C3.14712 11.1374 3.40147 11.032 3.66669 11.032H21.6667C21.9319 11.032 22.1863 11.1374 22.3738 11.3249C22.5613 11.5124 22.6667 11.7668 22.6667 12.032C22.6667 12.2972 22.5613 12.5516 22.3738 12.7391C22.1863 12.9266 21.9319 13.032 21.6667 13.032H3.66669C3.40147 13.032 3.14712 12.9266 2.95958 12.7391C2.77204 12.5516 2.66669 12.2972 2.66669 12.032ZM3.66669 17.064C3.40147 17.064 3.14712 17.1694 2.95958 17.3569C2.77204 17.5444 2.66669 17.7988 2.66669 18.064C2.66669 18.3292 2.77204 18.5836 2.95958 18.7711C3.14712 18.9586 3.40147 19.064 3.66669 19.064H21.6667C21.9319 19.064 22.1863 18.9586 22.3738 18.7711C22.5613 18.5836 22.6667 18.3292 22.6667 18.064C22.6667 17.7988 22.5613 17.5444 22.3738 17.3569C22.1863 17.1694 21.9319 17.064 21.6667 17.064H3.66669Z" />
                </symbol>

                <symbol id="language-logo">
                    <path d="M0.5 11C0.5 16.523 4.977 21 10.5 21C16.023 21 20.5 16.523 20.5 11C20.5 5.477 16.023 1 10.5 1C4.977 1 0.5 5.477 0.5 11Z" fill="white" stroke="#A51899" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11.5 1.05C11.5 1.05 14.5 5 14.5 11C14.5 17 11.5 20.95 11.5 20.95M9.5 20.95C9.5 20.95 6.5 17 6.5 11C6.5 5 9.5 1.05 9.5 1.05M1.13 14.5H19.87ZM1.13 7.5H19.87Z" fill="white" />
                    <path d="M11.5 1.05C11.5 1.05 14.5 5 14.5 11C14.5 17 11.5 20.95 11.5 20.95M9.5 20.95C9.5 20.95 6.5 17 6.5 11C6.5 5 9.5 1.05 9.5 1.05M1.13 14.5H19.87M1.13 7.5H19.87" stroke="#A51899" strokeLinecap="round" strokeLinejoin="round" />
                </symbol>

                <symbol id="bag-logo">
                    <path d="M5.5714 6.617H15.0952C16.5238 6.617 17.7143 8.02126 17.9523 9.42552L19.3809 18.7872C19.6191 20.1922 17.9523 21.5957 16.5238 21.5957H4.14283C2.71425 21.5957 1.04746 20.1922 1.28568 18.7872L2.71425 9.42552C2.95235 8.02126 4.14283 6.617 5.5714 6.617Z" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6.04758 10.3617V6.13257" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14.6191 6.14893V10.3617" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14.619 6.14892C14.619 4.74467 13.7887 3.248 12.4678 2.49837C11.147 1.74875 9.5196 1.74875 8.19873 2.49837C6.87787 3.248 6.04758 4.74467 6.04758 6.14892" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </symbol>

                <symbol id="profile-logo">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.9848 15.3462C8.11719 15.3462 4.81433 15.931 4.81433 18.2729C4.81433 20.6148 8.09624 21.2205 11.9848 21.2205C15.8524 21.2205 19.1543 20.6348 19.1543 18.2938C19.1543 15.9529 15.8734 15.3462 11.9848 15.3462Z" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.9848 12.0059C14.5229 12.0059 16.58 9.94781 16.58 7.40971C16.58 4.87162 14.5229 2.81448 11.9848 2.81448C9.44667 2.81448 7.38858 4.87162 7.38858 7.40971C7.38001 9.93924 9.42382 11.9973 11.9524 12.0059H11.9848Z" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </symbol>

                <symbol id="arrow-left">
                    <path xmlns="http://www.w3.org/2000/svg" d="M23.3333 14H4.66666M12.8333 5.83337L4.66666 14L12.8333 22.1667" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </symbol>

                <symbol id="arrow-right">
                    <path d="M1.16666 6.00004H11.8333M7.16666 1.33337L11.8333 6.00004L7.16666 10.6667" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </symbol>

                <g id="dev-logo" clipPath="url(#clip0_512_609)">
                    <path d="M2.41604 0.426769C2.80253 0.381001 3.20346 0.464704 3.53731 0.66298C3.87955 0.86356 4.1502 1.18071 4.29181 1.54854C4.44228 1.93373 4.44896 2.37129 4.31107 2.76093C4.17411 3.1538 3.89104 3.49414 3.5283 3.70378C3.18436 3.90575 2.76992 3.9853 2.37427 3.9294C1.95004 3.87226 1.55097 3.65556 1.2724 3.33426C1.00796 3.03339 0.852528 2.64144 0.839795 2.2429C0.823335 1.82469 0.964484 1.40279 1.23048 1.0772C1.51914 0.71781 1.9547 0.477605 2.41604 0.426769Z" fill="#FF8A00" />
                    <path d="M0.908447 4.70703C2.05239 4.70703 3.19618 4.70703 4.34012 4.70703C4.33919 4.84848 4.34432 4.99009 4.33174 5.13108C3.50379 5.4966 2.74168 6.01833 2.12894 6.6815C1.63329 7.21782 1.24075 7.85212 1.01388 8.54478C0.978789 8.54877 0.94354 8.55338 0.908447 8.55829C0.908447 7.27449 0.908447 5.99084 0.908447 4.70703Z" fill="#FF8A00" />
                    <path d="M6.72675 4.86172C7.10672 4.81657 7.49057 4.79538 7.87287 4.82271C9.2238 4.90672 10.5564 5.37178 11.6358 6.185C11.7165 6.24858 11.8025 6.30556 11.8836 6.36899C12.3559 6.73068 12.7606 7.18038 13.0609 7.69166C13.1459 7.84232 13.241 7.987 13.3218 8.13997C13.6743 8.7887 13.9089 9.50087 14.0047 10.2315C14.0294 10.4046 14.0351 10.5793 14.0469 10.7537C14.1743 12.8974 14.0642 15.0445 14.0915 17.19C13.0176 17.19 11.9437 17.19 10.8696 17.19C10.8696 16.3184 10.8696 15.447 10.8696 14.5754C10.871 13.649 10.8667 12.7221 10.8721 11.796C10.857 11.0144 10.5988 10.2477 10.184 9.58611C9.70362 8.83939 8.90346 8.2808 8.0106 8.1541C7.31526 8.06179 6.57303 8.15041 5.96542 8.51486C5.48685 8.77903 5.0915 9.17635 4.80206 9.63418C4.42427 10.2319 4.20905 10.9241 4.14663 11.6245C4.14523 13.4796 4.14647 15.3349 4.14601 17.19C3.07194 17.19 1.99803 17.19 0.924112 17.19C0.93141 16.7947 0.926442 16.3991 0.927839 16.0038C0.91728 14.7547 0.897715 13.5053 0.913553 12.2562C0.923957 11.6963 0.941038 11.1364 0.97582 10.5773C1.04508 9.56154 1.39352 8.57169 1.94399 7.71377C2.29057 7.08608 2.82365 6.58079 3.40408 6.16411C3.74554 5.91807 4.10455 5.69445 4.48514 5.51215C5.18824 5.17242 5.95051 4.95572 6.72675 4.86172Z" fill="white" />

                </g>

                <symbol id="telegram-logo">
                    <path d="M13.7767 2.478L1.95667 7.036C1.15001 7.36 1.15467 7.81 1.80867 8.01067L4.84334 8.95733L11.8647 4.52734C12.1967 4.32534 12.5 4.434 12.2507 4.65534L6.56201 9.78933H6.56067L6.56201 9.79L6.35267 12.918C6.65934 12.918 6.79467 12.7773 6.96667 12.6113L8.44067 11.178L11.5067 13.4427C12.072 13.754 12.478 13.594 12.6187 12.9193L14.6313 3.434C14.8373 2.608 14.316 2.234 13.7767 2.478Z" fillOpacity="0.8" />
                </symbol>

                <symbol id="fb-logo">
                    <path d="M3.00934 11.2871C2.53255 11.2871 2.08841 11.2871 1.65081 11.2871C1.26546 11.2871 0.886637 11.2936 0.501285 11.2806C0.135526 11.2675 0.00489855 11.15 0.00489855 10.7907C-0.00163285 9.75877 -0.00163285 8.72027 0.00489855 7.68831C0.0114299 7.32256 0.148589 7.20499 0.52741 7.20499C1.2524 7.19846 1.97738 7.20499 2.70237 7.20499C2.79381 7.20499 2.87871 7.20499 3.00281 7.20499C3.00281 7.09396 3.00281 7.00252 3.00281 6.90455C3.0224 5.97056 2.98975 5.03004 3.06159 4.09605C3.24447 1.93415 4.8512 0.268646 7.01309 0.0661723C8.12996 -0.0383301 9.25989 0.0139211 10.3833 0.0073897C10.638 0.0073897 10.7817 0.15108 10.7817 0.405805C10.7882 1.41817 10.7882 2.42401 10.7817 3.43637C10.7817 3.72376 10.625 3.84132 10.2853 3.84785C9.63871 3.86091 8.99863 3.86745 8.35203 3.87398C8.27365 3.87398 8.18874 3.87398 8.11036 3.88051C7.58785 3.92623 7.28088 4.18748 7.26128 4.71C7.22862 5.51336 7.25475 6.31672 7.25475 7.15274C7.34619 7.15274 7.43763 7.15274 7.52254 7.15274C8.37162 7.15274 9.21417 7.15274 10.0633 7.15274C10.5596 7.15274 10.6903 7.28337 10.6903 7.77322C10.6903 8.75293 10.6903 9.72611 10.6903 10.7058C10.6903 11.1434 10.5727 11.2545 10.1416 11.261C9.27295 11.2675 8.39775 11.261 7.52907 11.261C7.44416 11.261 7.35272 11.261 7.24169 11.261C7.24169 11.3851 7.24169 11.4765 7.24169 11.5745C7.24169 14.1217 7.24169 16.6755 7.24169 19.2228C7.24169 19.9282 7.16984 20 6.45139 20C5.5174 20 4.57688 20 3.64289 20C3.13997 20 3.0224 19.8759 3.0224 19.3795C3.0224 16.7866 3.0224 14.2001 3.0224 11.6072C3.00934 11.5092 3.00934 11.4177 3.00934 11.2871Z" />
                </symbol>

                <symbol id="instagram-logo">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.97667 0.710672C5.75867 0.674672 6.008 0.666672 8 0.666672C9.992 0.666672 10.2413 0.675338 11.0227 0.710672C11.804 0.746005 12.3373 0.870672 12.804 1.05134C13.2927 1.23601 13.736 1.52467 14.1027 1.898C14.476 2.264 14.764 2.70667 14.948 3.19601C15.1293 3.66267 15.2533 4.19601 15.2893 4.97601C15.3253 5.75934 15.3333 6.00867 15.3333 8C15.3333 9.992 15.3247 10.2413 15.2893 11.0233C15.254 11.8033 15.1293 12.3367 14.948 12.8033C14.764 13.2927 14.4755 13.7361 14.1027 14.1027C13.736 14.476 13.2927 14.764 12.804 14.948C12.3373 15.1293 11.804 15.2533 11.024 15.2893C10.2413 15.3253 9.992 15.3333 8 15.3333C6.008 15.3333 5.75867 15.3247 4.97667 15.2893C4.19667 15.254 3.66334 15.1293 3.19667 14.948C2.70729 14.764 2.26389 14.4755 1.89734 14.1027C1.52426 13.7365 1.23555 13.2933 1.05134 12.804C0.870672 12.3373 0.746672 11.804 0.710672 11.024C0.674672 10.2407 0.666672 9.99134 0.666672 8C0.666672 6.008 0.675338 5.75867 0.710672 4.97734C0.746005 4.196 0.870672 3.66267 1.05134 3.19601C1.23582 2.70673 1.52475 2.26355 1.898 1.89734C2.26403 1.52434 2.70699 1.23563 3.19601 1.05134C3.66267 0.870672 4.19601 0.746672 4.97601 0.710672H4.97667ZM10.9633 2.03067C10.19 1.99534 9.958 1.98801 8 1.98801C6.042 1.98801 5.81 1.99534 5.03667 2.03067C4.32134 2.06334 3.93334 2.18267 3.67467 2.28334C3.33267 2.41667 3.08801 2.57467 2.83134 2.83134C2.58803 3.06804 2.40079 3.35619 2.28334 3.67467C2.18267 3.93334 2.06334 4.32134 2.03067 5.03667C1.99534 5.81 1.98801 6.042 1.98801 8C1.98801 9.958 1.99534 10.19 2.03067 10.9633C2.06334 11.6787 2.18267 12.0667 2.28334 12.3253C2.40067 12.6433 2.58801 12.932 2.83134 13.1687C3.06801 13.412 3.35667 13.5993 3.67467 13.7167C3.93334 13.8173 4.32134 13.9367 5.03667 13.9693C5.81 14.0047 6.04134 14.012 8 14.012C9.95867 14.012 10.19 14.0047 10.9633 13.9693C11.6787 13.9367 12.0667 13.8173 12.3253 13.7167C12.6673 13.5833 12.912 13.4253 13.1687 13.1687C13.412 12.932 13.5993 12.6433 13.7167 12.3253C13.8173 12.0667 13.9367 11.6787 13.9693 10.9633C14.0047 10.19 14.012 9.958 14.012 8C14.012 6.042 14.0047 5.81 13.9693 5.03667C13.9367 4.32134 13.8173 3.93334 13.7167 3.67467C13.5833 3.33267 13.4253 3.08801 13.1687 2.83134C12.932 2.58805 12.6438 2.40081 12.3253 2.28334C12.0667 2.18267 11.6787 2.06334 10.9633 2.03067ZM7.06334 10.2607C7.58644 10.4784 8.16892 10.5078 8.71129 10.3438C9.25366 10.1798 9.72227 9.83262 10.0371 9.3615C10.3519 8.89038 10.4934 8.32458 10.4374 7.76074C10.3814 7.1969 10.1313 6.66999 9.73 6.27C9.47416 6.01432 9.16481 5.81855 8.82423 5.69677C8.48364 5.57499 8.12029 5.53025 7.76033 5.56575C7.40038 5.60125 7.05277 5.71612 6.74254 5.90209C6.43231 6.08806 6.16717 6.3405 5.96621 6.64124C5.76525 6.94198 5.63346 7.28353 5.58035 7.64131C5.52723 7.99909 5.55411 8.3642 5.65903 8.71035C5.76396 9.0565 5.94433 9.37508 6.18715 9.64315C6.42998 9.91123 6.72922 10.1221 7.06334 10.2607ZM5.33467 5.33467C5.68469 4.98465 6.10022 4.70701 6.55754 4.51758C7.01486 4.32815 7.50501 4.23065 8 4.23065C8.495 4.23065 8.98515 4.32815 9.44247 4.51758C9.89979 4.70701 10.3153 4.98465 10.6653 5.33467C11.0154 5.68469 11.293 6.10022 11.4824 6.55754C11.6719 7.01486 11.7694 7.50501 11.7694 8C11.7694 8.495 11.6719 8.98515 11.4824 9.44247C11.293 9.89979 11.0154 10.3153 10.6653 10.6653C9.95845 11.3722 8.9997 11.7694 8 11.7694C7.00031 11.7694 6.04156 11.3722 5.33467 10.6653C4.62778 9.95845 4.23065 8.9997 4.23065 8C4.23065 7.00031 4.62778 6.04156 5.33467 5.33467ZM12.6053 4.79201C12.6921 4.71018 12.7615 4.61179 12.8095 4.50265C12.8576 4.39352 12.8832 4.27585 12.8849 4.15662C12.8867 4.0374 12.8645 3.91904 12.8197 3.80854C12.7748 3.69805 12.7083 3.59768 12.624 3.51336C12.5397 3.42905 12.4393 3.36251 12.3288 3.31768C12.2183 3.27286 12.0999 3.25066 11.9807 3.25239C11.8615 3.25413 11.7438 3.27977 11.6347 3.3278C11.5256 3.37583 11.4272 3.44527 11.3453 3.532C11.1862 3.70069 11.0991 3.92475 11.1025 4.15662C11.1059 4.3885 11.1995 4.60992 11.3634 4.7739C11.5274 4.93788 11.7488 5.03149 11.9807 5.03487C12.2126 5.03825 12.4367 4.95113 12.6053 4.79201Z" />
                </symbol>
            </defs>
        </svg >
    );
}

export default Sprites;
import React, { useState } from "react";
import axios from "axios";
import "./css/Bookingcard.css";
import { Avatar } from "@material-ui/core";
import {
  HighlightOff,
  Category,
  Phone,
  Email,
  ErrorOutline,
  Done,
} from "@material-ui/icons";
import { useStateValue } from "../../Context API/datalayer";

function Card({
  _id,
  owner,
  bookingpackage,
  bookingdate,
  isConfirmed,
  extraInfo,
}) {
  const [{ currentuser }, dispatch] = useStateValue();

  const handleClick = (newstatus) => {
    axios
      .put(
        `http://localhost:5000/bookings/updatestatus/${_id}`,
        { newstatus: newstatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res?.data);
      })
      .catch((err) => {
        console.log(err?.response?.data);
      });
  };

  return (
    <div className="bookingcard">
      <div className="bookingcard_left">
        <h2 className="bookingcard_left_header"> Booking Information</h2>
        <div className="bookingcard_left_info">
          <p className="bookingcard_left_info_title text">
            Package : {bookingpackage?.title}
          </p>
          <p className="bookingcard_left_info_description  text">
            Description : {bookingpackage?.description}
          </p>
          <p className="bookingcard_left_info_price  text">
            Price : Rs.{bookingpackage?.price}/=
          </p>
          <p className="bookingcard_left_info_extra text">
            Extra Information : {extraInfo}
          </p>
          <p className="bookingcard_left_info_date text">
            Date : {new Date(bookingdate).toDateString()}
          </p>
        </div>
      </div>
      <div className="bookingcard_right">
        <h2 className="bookingcard_bottom_header"> Vendor Information</h2>
        <div className="bookingcard_right_left">
          <Avatar
            src={
              "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPDw0NDw8PDQ0NDQ0PDQ0PDw8NDw0NFhIXFxYSGRcZHikhGRsnHBYWIjQiJiosLy8vGCA1OjUuOSkuLywBCgoKDg0OGxAQGCwmISYuLjEuMCwuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4sLi4uLi4uLi4uLv/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAAAQIFBgQDB//EAEUQAAICAQICBwQFBwkJAAAAAAABAgMRBBIFIQYTMUFRcYEiMmGRFCNSocEVJEJic4KxMzRTkpOisrPRBxY1RFRyg9Lw/8QAGgEBAQADAQEAAAAAAAAAAAAAAAECAwUEBv/EADQRAAIBAwIEBAQFAwUAAAAAAAABAgMEESExBRJBUSJhcYETFDKRBkKCobHR8PFTYrLB4f/aAAwDAQACEQMRAD8A/PzIxB2ztmZAilALkxAKZkIi5KUGRAAXIMQXJcmQMSjIyUEIMjJkMmJRkZBCkIQAZI2AMggBAygjICEAIAAAQAhQAZGKYAMslMSlACABTLIyYgAzIYlAKUxABkDEAGQMSAGeTHJAAABkApMgAgMSkABACAAAEIUxyUApckAKUpAAZZBiUoKTIKAAACgEABQMkAKAAAAAQEAAAIQAoyQEABCNghQTIICFyTIAMimIyUGQIUAuQQApQQAGRCH0dctqnh7HlKWHtbXaslI2kYGUU20km22kklltvsREvXyO96McAVEVfak9RJewv6GLxyX63i/QxlPlRzuKcUpcPpc89X0Xd/0XVnE6vSWUy2WwlXLCeJLtT7zzn6lxbhleqrddi583Ca96uXivxXefm3ENFOiyVNixKPa+6SfZJfBmMKnMeTgvHIcQhyvSa3Xl3Xfz7HnB7PyXd1MtQ4OFMUvrJpx3ZwkortfaeEzymdmnVhUzySTw8PGuvsUAgNhRkgAAIAQAmQQDIIAACkBSFyCAxMiFQBQECAGQIMgFBEygFOx6BWKUNTRJKUcxntl7Se5KL5PyRxp0/QGf190ftaeT+U4/6mNT6WcX8RQ5uHVH1WGvZo3mt6M17436bbRdCSnGDW+mUl4x7vT5ZPouPxrhYtVF0X0RzKr3lcu6VbfvJ/cffjnFJaWNNir62M7tk0m1JNptNcnnsfI5PpZxNanqtkLI1whmW+pwcbJN+znyS+Zpim8ZPkOHW1xxH4cblc0NUpZWVjeO+z++u+p0fAekUdU5Vyj1V3NwjnKnD4PxXeja3aGqycLZ1wnOpNQlJZ2ry7/XsPyiq2UJRnFuM4OMoyXdJdh2Op6VWyjXGiiUJyVanZbBuMJvGdviufayyp6+E9nFPw7UpXClZaKWcrOMd/Zo9nTmWNIl9rUQT9Iyf4I4A7zp1H81h34vhl/+KaODNlL6Ts/hNJcP/VL/AKBARs2H0hQTIICtkIUAhSZDAKYgAgAABAQZIQyBAXIKXJAgVFKY5ALkoIjIDIOi6C2Jatx+3Tal5qUZfwTOcyerhurdF1V8ebrsjLHiuxr1Ta9SSWVg8fEKDuLWpSW7Tx69P3O86ar8zcuxwupkmuWHzX4mPCn9K0X0W2bnZLSxlKUnl7ZuSrl6YXyPRxJw1uht6h9Zvjuh3y3xxLY/B93M5nS636LrdOpezGOm0mmtT7lKuLbflJ5+ZojrHC3R8HY0JVbF28dKtOUpLumkum+pqdFo/r5QtW2FDts1Hwrrbc164x6o6/pVa3ToJpuMZarTScU+WHBvB4emUK6ZWShyt1ygrF4VQzuf7z2fI2N+n+kaLh/OKUJaCyycmoKNcI5m238MmUpZwzo3l38w7a8lnly1j9Or93p7eZh07mlpox75alY9ITZwJvulvGY6q2Ma3mmrcoy/pJvOZeXJJGhyZ01hHc/D1pO1sIwqLDeXjtn/AMwQDJTM7YITIyBkuSMAEAIAQAmQQFBAAAQEBQAUFLk21PCN2gs1iXtV6jb8HQoe1/eafoafP3kTNNG4p1XNQf0vlfqv8ouSm20/CHLQXax59i2Ea/DYuU382v6pqCp5FG4p1XJQeeV4frhf1KDbdGOGLVaiNcs9VCLna1y9nkks/FtfJnh4hpZU22Uy96uco58Vnk/VYfqM64MY3VKVeVBPxJJtep5y5Nl0b0cNRqqqbE3CW/KTcXyjlc18UfHjOnjVqL6oZUK7Jxim22lnx7xza4CuoO4dv+bl5vLDeP5Plo9dbS91Vk65d+2TSfmux+p9tZxKd73XRrtm0k7HBQm/Nwxn1PnwvRS1F1dEHh2Sxl9kYrm5fLJ09+i4Vp5dRdKyy1YU5pze1vx28k+fZzMZNI8d5d29Guk6bnUxnwxzLHd7ae/ocvrtfZfKMrJb5RhGEXhLEI9iJdrLJxjXOycq4RUYQcpbIpdnLsNh0h4bTp3VOi5W1XJyhFyjKcV45XbHu8eR6NRwqmPDq9WlLr52qLlvbjjdJe72diReZaGSvLT4VKUY6Slyx8Ozeejw1thnPsEOg/JdX5Mer9rrlbt3bnt270vd7OwraW56ri6hQ5eb80lFer2NACG+0/AXLh9ms59Ypb4Lueninuf8X+78Q3gtxdUrdRdR45mkvVmiJkM3vC+APU6Oy6v+cV3Sio55WwVcXt+Dy3hhywLq6pW0VOq8JtL77GiyCyynhrD7GmsNPwN90Q4XTqrLoXKTUK4zjtls57kn2eYcsEurqFtRlWnsu3+Tn8gsu/zZAehbZAIUgIC5ABAACDJUyH009LsnCtds5wgv3ml+IQclFOT2R+i8GVdWk0Wms/5yprb4uyLk18nj5HB6nh869Q9NjNnXdXH9bMtsH6ppnQdOdU4ajRwreHpqoTjjliW72fugjdV6eu62ji7ajXHSOc1y9m9dnqk5r0RqjLCy+p8VZ3M7Gn81LLVZSf68+H7rQ+saa+qt4XDnKrQpP3ec5JxT88pP94/NWu06XoxxKVnEpWy7dV18cdyUnuivTYkeWfCHPiNmlXuvU2Nv7NLn1n+F4+RlHR4Z7+FR+Qq1adV7wVRvz1UvfP8ABteGz+gcNlqeS1GrnHqs+G32f7qlL1R8emNMba9NxCtezdXCFmO6eJSjn48pR9EbbpDp9HfKuq3XQ0/0eO1UxspW1rHan8EkZaHRaaelt4fVqo6ndGcq/brlKtvGHy7lPD9TDmx4jk0r6FOcb1qXO5NyzFpcktMZxjEUkzmOhb/PavK7/LZ5ukn881X7af8AFnr6IQceIVxktsou6Mk+6Si00ePpIvzzV/tpmz879D6SnrxaTX+lH/kxwDXrTamq6SzCLlGeO3ZJYbXzz6G/410e+lSnrNJZC6Fst0q3NJ7sZeGlj0fM5XSaSy6ca6oylKX6K/j8F8WZ6bUXaayThKdNsHiS9qLyu6UX+JXFt6bmy7tJyr/Gt6ijUUcNPVOOdMrfGevfTB876Z1ydc4yjKPbCScGjstNoLNTwmimpJzc1L2pKKwrZZ5s+PSfF+g0msnBQvcoJ4WMxlCTa8uW71JK+dfBqZVzlXLrUt0JOMsOyeVlGOW0vU5V3d1LujQlFKM1W5e8eZZXuvc13+5+s+zD+1X+ht+IaKen4RKm1JTjbFtKSksSsTXNHKPi2p/6jUf293/sdJbdKzgspTlKcnesylJzk/rF3sS5tM9zK/hfKVH5icHH4kfpi08+7OX0OlldbXTH3rJwin4ZfN+iy/Q72fFIU6yjhyUfo606okuWOslhRi/RY/fNR0G0kYu7W2NQrpTrhKXKKeFKcs+WF6sz1PDdDZbO98TirJWSt3Kyj2ZZyseXL5Em03hmni1ejc3cqNXmcYRaWE345ddFpyrBznG9B9H1FtPdGTcW++tvMX+HodN0W1bo4dqr0lJ1Xzkovsf1dXIvTXTQupq1tUo2KDVVk4NSjKHNp5XhLP8AWPNwb/hGv/77f8usN5iW5uVe8Mp/E354Rkn3Tw/vv7n243wyvXVfTtIs2Y+up5bm0stY+2vvR8v9nf8ALaj9jH/GaPgvF7NLcrI84NpWwbwrI/g13M7/AIPp9PKyeu079nU1YnWlFJWZy21+jLxXqST5Vg1cUdSxtZ2s8um/ol1XiXhfotn2PzCfvPzf8SCfvS83/EhtPsI/SvQAEBSggAJkEBCGR6+E6uNF9NsouyNUlLYmouTWcc38cM8YyDGpBVIOEtmmn6M2HG+I/Sr5342KaSjFtNqKSXb55PpVxecdHZolnZO2M92fdrx7UPVqL+ZqzIY0waflKPwo0uXwxw0uzW399f3PvoNS6barlzddldmM43bZZa+WToq+lVUdRbqlpp9ZZTCpZnHEdreX64ivQ5bIDima7rh9vdS5qscvGN8aN5x99TO25zlKbeZTlOUn4yby/vPVwfiL019d6TlseJRzjfB9sf8A7wPEfbTafrN+ZxrjXBzlKW5rG+Mf0U32yRXseitCm6ThU+nGMeW2DcQ47XHX/To0yjF7nKrfHLnKDTaeMfE2NnSrSSblLQVyk+bk40ybfi20cw9PBJtX1ZSeEo3pv4c4YPlZW4xrk+yyLlH4JSlF59Ysw5UzmVOFWdZxypZSUVrJPC2XRv3Nxq+Or6RDU6WqOlcK4wdajHZP2m3lRSTTTS9DaS6U6WzbO/RRncv0lGqaz5yefnk5OquU5KEU5Sk8RiubbPS9JBcpX1KX2V1tkV8N8YtfLJXFFr8Lsnyxkmmlphy5sebWrXqezj/Hp6xxTiqqq+cKU+/s3N+OPkW7jSehhoeralCal1m5YftN9mPiazUaeVeN2NslmLi1OE12ZjJcnz+R9p6BJ7XfTv2xbjJ2QS3RUktzjt7Gu8YRv+WtI06cEvDF80cd110y29dc9eh5Mm5/LS+gPQ9XLc7N/W7ltxu3Yxg1N1MoScZpxa95Pyz6rDXzMq9JOVc7kvYqcFLzl2Y+7Pmi6Hor0qNZQlUxhNNa6Z6eu5ttTx2L0UNDVXKtLb1s219b3y5Jcsyx6GkyQBLBbe2p0E1Bbtt9W299Td8I47GnT36W2uV1V2cYmoODlDEnz8k/NGGh40qtHqdI65Sle5vrNyxDMYx7MfqmnGQ4pmmXDreTk3H6pKT1/Mtn5efcG14Bxuejs3L2q3hW155SX2l4SRqSB6nor0adem6dRZTMpP78mIKDatsAhAAUEAIQpEAMlBMgFLkpAAUEABT3cNUXHUqUnCP0dZko72vr6u7KPDk9OlsShqU2k50qKX2n19csL0TYNNwm6bS8v5QvqqSzC2Vks+66urXnnc/kZar+T0v7Kf8AnWnlPbKpTr0+LKYuFc4yjO2EJJu2yS5P4SQMKngcW22svf0fZE08ttF017051Ut/ZhJTlJeuxLyyjyN/ceulqvdXZKM6rkt7qnGxwcXmM1h9qeeXem13kei743aeUftO+Nb9Yy9pfImSRqxi5OXXZ6+n7MaeW6m+D7IKu2P6snONb+an/dXgfTW0Tne1CE7Hs0+FCMpP+Rr8EYXzhCt01y6xycZWW4xGWM7YRzz2pvOe94PrquJWK1Ou2ThGNO2O+Uq3iuCcXHsxyaa8wYeNz5oLfmxnP+1Z99z5cRaiqa21KdVTjY000m7JSUM9+1P72u49MJquVGnk8QnXjU/CVyWX+7FVvzizz7aXbVLKjTL27K85lWo5cqfjnGIvv3Ixs4lOcpTlGluTbedPQ+3t5uPP1BhySnFRis4Tbzpq8+T2y/2PPZW4ylGSxKMnGS8JJ4Z8z1cRuVko25TnZXF2pcsWrMW8d2Uoy/eZ5MlPbTk5RTe/UoIAZmRCAApCDIBSFAITIJkoGSFyY5KQhclMQAZAxTLkoyAMjIKCgAAuSEAMgYgFLkpiADIgAJkuTEoAyQFJkAFJkjYBkTJAQmRkEGQCggAAyAQgABcgFMS5AKCAFLkZIUoGRkAgLkZIAXJcjJABkZGQAQZGQQoKCFyQAhckBAABkEyUAgAAAMclyQEBkDEZKDIEyMgFAAAAAAGQC5AyMgDIGRkAZAyACAAAAAAAAjGQCgmSEAbAAAAABMgxLkEKUxKgCgAFAAALkZIAC5GSAAuRkgALkZIAC5GSAAuRkgAAAAAAABCmIBQTJAQuQQAAAAAqAAKwAAAAAUgAKUAAAAAAAAAgAAKAACAAAAAhGQAAAAAAAEP/2Q=="
            }
            id="bookingcard_right_left_logo"
          />
          <h3 className="bookingcard_right_left_title">{owner?.title}</h3>
        </div>
        <div className="bookingcard_right_center">
          <h4 className="bookingcard_right_center_category label">
            <Category id="icon" /> {owner?.category}
          </h4>
          <h4 className="bookingcard_right_center_contactno label">
            <Phone id="icon" /> {owner?.contactdetails?.contactno}
          </h4>
          <h4 className="bookingcard_right_center_email label">
            <Email id="icon" /> {owner?.contactdetails?.email}
          </h4>
        </div>
      </div>
      <div className="bookingcard_bottom">
        <h2 className="bookingcard_bottom_header"> Status Information</h2>
        <div className="bookingcard_bottom_info">
          {isConfirmed === "Accepted" && (
            <div className="selector_button accept">
              <Done id="selector_button_icon" /> Accepted
            </div>
          )}
          {isConfirmed === "pending" && (
            <div className="selector_button pending">
              <ErrorOutline id="selector_button_icon" /> Pending
            </div>
          )}
          {isConfirmed === "Rejected" && (
            <div className="selector_button reject">
              <HighlightOff id="selector_button_icon" /> Rejected
            </div>
          )}
          {currentuser?.usertype === "vendor" && (
            <div className="booking_button_container">
              <button
                className="button accept_button"
                type="button"
                onClick={() => handleClick("Accepted")}
              >
                Accept
              </button>
              <button
                className="button reject_button"
                type="button"
                onClick={() => handleClick("Rejected")}
              >
                Reject
              </button>
            </div>
          )}

          {/* <p className="bookingcard_bottom_status_message">
        I have another appointment on that day.Sorry.
      </p> */}
        </div>
      </div>
    </div>
  );
}

export default Card;

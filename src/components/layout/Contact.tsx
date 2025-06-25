import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import {
    FaWhatsapp,
    FaInstagram,
    FaFacebookF,
} from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";

export const Contact = () => {


    const socialMedias = [
        {
            id: 1,
            icon: FaWhatsapp,
            link: 'https://wa.me/917639874667'
        },
        {
            id: 2,
            icon: FaInstagram,
            link: 'https://www.instagram.com/prasanth_nursery_garden?igsh=Nzd5c2ptMnBkY2M1'
        },
        {
            id: 3,
            icon: FaFacebookF,
            link: 'https://www.facebook.com/share/1Er7yzKGfL/?mibextid=qi2Omg'
        },
        {
            id: 4,
            icon: RiTwitterXLine,
            link: '#'
        }
    ];


    return (
        <footer className="py-16 px-4 sm:px-10 lg:px-20 text-[var(--color-primary-dark)]">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl sm:text-4xl font-bold text-center mb-4 text-[var(--color-primary)]">
                    Contact Prasanth Nursery 🌿
                </h2>
                <p
                    className="text-center text-gray-700 max-w-2xl mx-auto mb-10"
                    style={{ fontFamily: "Lora, serif" }}
                >
                    Whether you have a question about our plants, availability, services, or anything else — we’re here to help you grow green!
                </p>


                <div className="flex flex-col sm:flex-row gap-5 items-start mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                        <div className="flex flex-col justify-center space-y-6 text-[var(--color-primary)]">
                            <div className="flex items-start gap-4">
                                <FaPhoneAlt className="text-xl mt-1 text-[var(--color-primary-light)]" />
                                <div>
                                    <h4 className="font-semibold">Phone</h4>
                                    <p className="text-gray-700">+91 7639874667</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <FaEnvelope className="text-xl mt-1 text-[var(--color-primary-light)]" />
                                <div>
                                    <h4 className="font-semibold">Email</h4>
                                    <p className="text-gray-700">prasanthnursery@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <FaMapMarkerAlt className="text-xl mt-1 text-[var(--color-primary-light)]" />
                                <div>
                                    <h4 className="font-semibold">Address</h4>
                                    <p className="text-gray-700 leading-relaxed">
                                        886/77 - Kallukkudieruppu,<br />
                                        Melnilaivayal Post, Thirumayam Taluk,<br />
                                        Pudukkottai District, Tamil Nadu, India – 622 202
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="flex gap-2 items-center text-[var(--color-primary-dark)] mx-4">
                        {socialMedias.map(
                            (media, _) => (
                                <a
                                    key={media.id}
                                    href={media.link}
                                    className="h-12 w-12 bg-[var(--color-accent-light)] text-[var(--color-primary)] rounded-tl-md rounded-br-md border border-[var(--color-accent-light)] flex items-center justify-center hover:bg-[var(--color-accent-mid)] transition"
                                >
                                    <media.icon />
                                </a>
                            )
                        )}
                    </div>

                </div>

            </div>
        </footer>
    );
};

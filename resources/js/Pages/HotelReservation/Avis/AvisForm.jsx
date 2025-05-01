import React, { useEffect } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Textarea from "@/Components/Textarea";
import HotelReservationNavbar from "@/Layouts/HotelReservationAccueil/HotelReservationNavbar";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import HotelFooter from "@/Layouts/HotelReservationAccueil/HotelFooter";

const AvisForm = ({ hotel }) => {
  const { data, setData, post, processing, errors } = useForm({
    ht_hotel_id: hotel.id,
    note: 3.7,
    commentaire: "",
  });

  const { flash } = usePage().props;

  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success, { position: "top-center", autoClose: 3000 });
    }
    if (flash?.error) {
      toast.error(flash.error, { position: "top-center", autoClose: 3000 });
    }
  }, [flash]);

  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/reservation-hotel/hotel/${hotel.id}/avis`, {
      onSuccess: () => {
        setData({ note: 3.7, commentaire: "" });
      },
    });
  };

  return (
    <>
      <HotelReservationNavbar />
      <div className="container mt-5">
        <div className="row shadow p-4 bg-white rounded-3">
          {/* Colonne 1: Infos Hôtel */}
          <div className="col-md-5 text-center">
            <img src={hotel.image_principale} alt={hotel.nom} className="img-fluid rounded shadow-sm" />
            <h2 className="mt-3 fw-bold">{hotel.nom}</h2>
          </div>

          {/* Colonne 2: Formulaire */}
          <div className="col-md-7">
            <Head title={`Laisser un avis pour ${hotel.nom}`} />
            <h2 className="h4 fw-semibold mb-4">Laisser un avis</h2>
            <form onSubmit={handleSubmit}>
              {/* Champ : Note */}
              <div className="mb-3">
                <InputLabel htmlFor="note" value="Note (sur 5)" className="form-label" />
                <TextInput
                  id="note"
                  type="number"
                  value={data.note}
                  onChange={(e) => setData("note", e.target.value)}
                  min="1"
                  max="5"
                  required
                  className="form-control"
                />
                <InputError message={errors.note} className="text-danger mt-2" />
              </div>

              {/* Champ : Commentaire */}
              <div className="mb-3">
                <InputLabel htmlFor="commentaire" value="Commentaire" className="form-label" />
                <Textarea
                  id="commentaire"
                  name="commentaire"
                  value={data.commentaire}
                  onChange={(e) => setData('commentaire', e.target.value)}
                  rows="4"
                  required
                  className="form-control"
                />
                <InputError message={errors.commentaire} className="text-danger mt-2" />
              </div>

              {/* Bouton de soumission */}
              <div className="text-end">
                <PrimaryButton type="submit" disabled={processing} className="btn btn-primary px-4 py-2">
                  {processing ? "En cours..." : "Soumettre l'avis"}
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>
      <HotelFooter/>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default AvisForm;

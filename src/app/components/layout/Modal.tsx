import { useExperienceListHooks, useInsertContactHooks } from "@/app/hook/hook";
import { Button } from "@heroui/react/button";
import { Card } from "@heroui/react/card";
import { Description } from "@heroui/react/description";
import { FieldError } from "@heroui/react/field-error";
import { Form } from "@heroui/react/form";
import { Input } from "@heroui/react/input";
import { Label } from "@heroui/react/label";
import { Modal } from "@heroui/react/modal";
import { TextArea } from "@heroui/react/textarea";
import { TextField } from "@heroui/react/textfield";
import { IoIosArrowDropright } from "react-icons/io";
import ExperienceListSkeleton from "./Skeleton";
import { Spinner, Typography } from "@heroui/react";
import { applicationErrString, applicationString } from "@/app/variables/enum";
import { emailFormatter } from "@/app/lib/helper";
import { CiCircleCheck } from "react-icons/ci";
import { useRef } from "react";
import { MdErrorOutline } from "react-icons/md";
import { Turnstile } from "@marsidev/react-turnstile";

export function ContactModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}) {
  const {
    handleInsertContact,
    setIsError,
    setIsSuccess,
    setToken,
    contact,
    token,
    isError,
    isSuccess,
    isWait,
  } = useInsertContactHooks();

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!fullName || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    handleInsertContact(fullName, email, message);
  };

  return (
    <>
      <Modal>
        <Modal.Backdrop
          variant="blur"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <Modal.Container
            placement="auto"
            className="w-[95vw] h-auto sm:w-auto sm:max-w-5xl max-h-[90vh] overflow-y-auto mx-auto my-4 sm:my-10 p-4 sm:p-6"
            size="cover"
          >
            <Modal.Dialog className="bg-black bg-[radial-gradient(circle_at_top_left,_rgba(239,68,68,0.30),transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(220,38,38,0.20),transparent_50%)] p-6 rounded-xl border border-slate-800 overflow-y-auto">
              <Modal.CloseTrigger className="bg-black border border-slate-400 text-slate-400" />
              <Modal.Header className="flex flex-col gap-3 font-quicksand font-semibold">
                <Modal.Heading className="mt-2 text-xl">Contact</Modal.Heading>
                <Typography type="h6" className="text-md text-slate-400 mt-2">
                  Let&apos;s connect and leave your message!
                </Typography>
              </Modal.Header>
              <Modal.Body className="mt-8" />
              <Card className="flex flex-col bg-black border border-slate-800 hover:bg-slate-700/60 hover:border-slate-600 hover:backdrop-blur-sm transition-all duration-300">
                <Form
                  ref={formRef}
                  className="flex p-6 flex-col gap-4"
                  onSubmit={handleSubmit}
                >
                  <TextField
                    isRequired
                    className="w-4/6 p-2 rounded-md font-quicksand"
                    name="fullName"
                  >
                    <Label>Name</Label>
                    <Input
                      placeholder="John Doe"
                      className="bg-transparent border border-slate-400 p-2 text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
                    />
                    <Description>This field is required</Description>
                  </TextField>
                  <TextField
                    isRequired
                    name="email"
                    type="email"
                    className="w-4/6 p-2 rounded-md font-quicksand"
                    validate={(value) => {
                      return emailFormatter(value)
                        ? null
                        : "Please enter a valid email address";
                    }}
                  >
                    <Label>Email</Label>
                    <Input
                      placeholder="john@example.com"
                      className="bg-transparent border border-slate-400 p-2 text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
                    />
                    <FieldError />
                  </TextField>
                  <TextField
                    name="message"
                    className="w-4/6 p-2 rounded-md font-quicksand"
                    validate={(value) => {
                      if (value.length < 10 || value.length > 500) {
                        return "Message must be between 10 and 500 characters long";
                      }
                      return null;
                    }}
                  >
                    <Label>Message</Label>
                    <TextArea
                      className="bg-transparent border border-slate-400 p-2 text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
                      placeholder="Leave your message..."
                      rows={4}
                    />
                    <FieldError />
                  </TextField>
                  <Turnstile
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                    onSuccess={(token) => {
                      setToken(token);
                    }}
                  />
                  <div className="flex flex-row gap-2">
                    <Button
                      type="submit"
                      className="bg-amber-800/40 rounded-xl p-4 hover:bg-amber-800/60 text-amber-200 transition-all duration-300"
                    >
                      Submit
                    </Button>
                    <Button
                      type="reset"
                      variant="secondary"
                      className="bg-transparent rounded-xl border border-amber-800/40 p-4 hover:bg-slate-600 text-slate-300 transition-all duration-300"
                    >
                      Reset
                    </Button>
                  </div>
                </Form>
              </Card>
              <Modal.Footer />
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
      {isWait && <LoadingModal isOpen={isWait} />}
      {contact && (
        <ContactScsModal
          isOpen={isSuccess}
          onOpenChange={() => {
            setIsSuccess(false);
            formRef.current?.reset();
          }}
        />
      )}
      {contact.length == 0 && (
        <ContactErrModal
          isOpen={isError}
          onOpenChange={() => {
            setIsError(false);
            formRef.current?.reset();
          }}
        />
      )}
    </>
  );
}

export function ContactErrModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}) {
  return (
    <Modal>
      <Modal.Backdrop
        variant="blur"
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={onOpenChange}
      >
        <Modal.Container placement="center" size="lg">
          <Modal.Dialog className="bg-black border border-slate-800 rounded-2xl">
            <Modal.CloseTrigger className="bg-black border border-slate-400 text-slate-400" />
            <Modal.Body className="grid grid-rows-2 p-4 items-center justify-center gap-6 py-10">
              <MdErrorOutline size={80} className="mx-auto text-red-900" />
              <div className="flex flex-col mx-auto items-center">
                <Typography className="font-quicksand font-semibold text-lg text-slate-200">
                  {applicationString.applicationSectionContactErrTitle}
                </Typography>
                <br />
                <Typography className="font-quicksand text-md text-slate-200">
                  {applicationString.applicationSectionContactErrMessage}
                </Typography>
              </div>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

export function ContactScsModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}) {
  return (
    <Modal>
      <Modal.Backdrop
        variant="blur"
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={onOpenChange}
      >
        <Modal.Container placement="center" size="lg">
          <Modal.Dialog className="bg-black border border-slate-800 rounded-2xl">
            <Modal.CloseTrigger className="bg-black border border-slate-400 text-slate-400" />
            <Modal.Body className="grid grid-rows-2 p-4 items-center justify-center gap-6 py-10">
              <CiCircleCheck size={80} className="mx-auto text-amber-400" />
              <div className="flex flex-col mx-auto items-center">
                <Typography className="font-quicksand font-semibold text-lg text-slate-200">
                  {applicationString.applicationSectionContactScsTitle}
                </Typography>
                <br />
                <Typography className="font-quicksand text-md text-slate-200">
                  {applicationString.applicationSectionContactScsMessage}
                </Typography>
              </div>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

export function ExperienceListModal({ company = "" }: { company: string }) {
  const { fetchExperienceList, experienceList, isWait, error } =
    useExperienceListHooks();
  return (
    <Modal>
      <Button
        className="-ms-2 mt-2 bg-black hover:bg-amber-800/40 hover:border-slate-600 hover:backdrop-blur-sm h-12 p-4"
        onClick={() => fetchExperienceList(company)}
      >
        More Details <IoIosArrowDropright size={16} className="-mt-0.6" />
      </Button>
      <Modal.Backdrop variant="blur">
        <Modal.Container
          placement="auto"
          className="w-[95vw] h-auto sm:w-auto sm:max-w-5xl max-h-[90vh] overflow-y-auto mx-auto my-4 sm:my-10 p-4 sm:p-6"
          size="cover"
        >
          <Modal.Dialog className="bg-black bg-[radial-gradient(circle_at_top_left,_rgba(239,68,68,0.30),transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(220,38,38,0.20),transparent_50%)] p-6 rounded-xl border border-slate-800 overflow-y-auto">
            <Modal.CloseTrigger className="bg-black border border-slate-400 text-slate-400" />
            <Modal.Header className="flex flex-row gap-3 font-quicksand font-semibold">
              <Modal.Heading className="mt-2 text-xl">
                Working Experience{" "}
                <p className="text-sm text-slate-400 mt-2">at {company}</p>
              </Modal.Heading>
            </Modal.Header>
            {isWait ? (
              <div className="text-sm text-slate-500">
                <ExperienceListSkeleton />
              </div>
            ) : error ? (
              <Card className="flex min-h-[260px] w-full flex-col items-center justify-center gap-6 border border-slate-800 bg-black p-12 text-center transition-all duration-300 hover:border-slate-600 hover:bg-slate-700/60">
                <div className="space-y-2">
                  <Typography type="h4" className="font-bold text-red-400">
                    {applicationErrString.applicationErrUXTitle}
                  </Typography>
                  <Typography type="h5" className="text-slate-400">
                    {applicationErrString.applicationErrUXSubTitle}
                  </Typography>
                </div>
                <Button
                  onClick={() => fetchExperienceList(company)}
                  className="rounded-xl bg-amber-800/40 px-6 py-3 text-amber-200 transition-all duration-300 hover:bg-amber-800/60"
                >
                  Retry
                </Button>
              </Card>
            ) : (
              <>
                {experienceList.map((exp, index) => (
                  <div key={index}>
                    <Modal.Body className="mt-8" />
                    <Card
                      key={index}
                      className="flex flex-col bg-black border border-slate-800 hover:bg-slate-700/60 hover:border-slate-600 hover:backdrop-blur-sm transition-all duration-300"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr]">
                        <div className="p-4">
                          <Typography
                            type="h6"
                            className="text-sm text-slate-500"
                          >
                            {exp.year}
                          </Typography>
                        </div>

                        <div className="p-6 pt-0 md:pt-2">
                          <Typography
                            type="h6"
                            className="flex flex-row text-sm mt-2 font-semibold text-slate-200"
                          >
                            {exp.position}
                          </Typography>
                        </div>
                      </div>
                      <div className="p-4 pt-0 md:pt-2">
                        <div className="space-y-4">
                          <Typography
                            type="h6"
                            className="flex flex-row text-md font-semibold text-slate-200"
                          >
                            Job Description
                          </Typography>
                          <ul className="list-disc list-inside text-sm text-slate-400 leading-relaxed max-h-72 overflow-y-auto">
                            {exp.joblist.map((job, index) => (
                              <li key={index}>{job}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Card>
                    <Modal.Footer />
                  </div>
                ))}
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

export function LoadingModal({ isOpen }: { isOpen: boolean }) {
  return (
    <Modal>
      <Modal.Backdrop variant="blur" isOpen={isOpen} isDismissable={false}>
        <Modal.Container placement="center" size="xs">
          <Modal.Dialog className="bg-black border border-slate-800 rounded-2xl">
            <Modal.Body className="flex flex-col items-center justify-center gap-6 py-10">
              <Typography className="font-quicksand font-semibold text-lg text-slate-200">
                {applicationString.applicationModalSubmittingTitle}
              </Typography>
              <div className="flex items-center justify-center">
                <Spinner size="xl" />
              </div>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

import UIKit
import AVFoundation


class ViewController: UIViewController, AVCaptureMetadataOutputObjectsDelegate {
    
    let session         : AVCaptureSession = AVCaptureSession()
    var previewLayer    : AVCaptureVideoPreviewLayer!
    var highlightView   : UIView = UIView()
    
    var firstTime:Bool = true
    
    override func viewWillAppear(animated: Bool) {
        print("welcome back")
        if firstTime == true
        {
            firstTime = false
            return
        }
        
        // Start the scanner. You'll have to end it yourself later.
        session.startRunning()
        // else we load the camera again
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        
        print("ViewController")
        // Allow the view to resize freely
        //self.highlightView.autoresizingMask =   [UIViewAutoresizing.FlexibleTopMargin, UIViewAutoresizing.FlexibleBottomMargin, UIViewAutoresizing.FlexibleLeftMargin, UIViewAutoresizing.FlexibleRightMargin]

        // Select the color you want for the completed scan reticle
        //self.highlightView.layer.borderColor = UIColor.greenColor().CGColor
        //self.highlightView.layer.borderWidth = 3
    
        // Add it to our controller's view as a subview.
        //self.view.addSubview(self.highlightView)

        // For the sake of discussion this is the camera
        let device = AVCaptureDevice.defaultDeviceWithMediaType(AVMediaTypeVideo)

        do {
            let input = try AVCaptureDeviceInput(device: device) as AVCaptureDeviceInput
            session.addInput(input)
        }catch let error as NSError {
            print("nooo")
            print(error)
        }
        
        let output = AVCaptureMetadataOutput()
        output.setMetadataObjectsDelegate(self, queue: dispatch_get_main_queue())
        session.addOutput(output)
        output.metadataObjectTypes = output.availableMetadataObjectTypes

        let previewLayer = AVCaptureVideoPreviewLayer(session: session)
        //previewLayer = AVCaptureVideoPreviewLayer.layerWithSession(session) as AVCaptureVideoPreviewLayer
        previewLayer.frame = self.view.bounds
        previewLayer.videoGravity = AVLayerVideoGravityResizeAspectFill
        self.view.layer.addSublayer(previewLayer)

        // Start the scanner. You'll have to end it yourself later.
        session.startRunning()
        
        //hide navigation bar
    }
    override func viewDidAppear(animated: Bool) {
        print("viewDidAppear")
        self.navigationController?.setNavigationBarHidden(true, animated: false)
    }
    override func viewWillDisappear(animated: Bool) {
        print("viewWIllDisappear")
        self.navigationController?.setNavigationBarHidden(false, animated: false)
    }


    // This is called when we find a known barcode type with the camera.
    func captureOutput(captureOutput: AVCaptureOutput!, didOutputMetadataObjects metadataObjects: [AnyObject]!, fromConnection connection: AVCaptureConnection!) {

        //var highlightViewRect = CGRectZero
        //var barCodeObject : AVMetadataObject!

        var detectionString : String!

        let barCodeTypes = [AVMetadataObjectTypeUPCECode,
            AVMetadataObjectTypeCode39Code,
            AVMetadataObjectTypeCode39Mod43Code,
            AVMetadataObjectTypeEAN13Code,
            AVMetadataObjectTypeEAN8Code,
            AVMetadataObjectTypeCode93Code,
            AVMetadataObjectTypeCode128Code,
            AVMetadataObjectTypePDF417Code,
            AVMetadataObjectTypeQRCode,
            AVMetadataObjectTypeAztecCode
        ]

        // The scanner is capable of capturing multiple 2-dimensional barcodes in one scan.
        for metadata in metadataObjects {
            for barcodeType in barCodeTypes {
                if metadata.type == barcodeType {
                    //barCodeObject = self.previewLayer.transformedMetadataObjectForMetadataObject(metadata as! AVMetadataMachineReadableCodeObject)
                    //highlightViewRect = barCodeObject.bounds
                    detectionString = (metadata as! AVMetadataMachineReadableCodeObject).stringValue
                    print(detectionString)
                    self.session.stopRunning()
                    
                    let whatsInThisViewController = self.storyboard?.instantiateViewControllerWithIdentifier("WhatsInThisViewControllerIdentifier") as? WhatsInThisViewController
                    whatsInThisViewController?.productCode = detectionString
                    self.navigationController?.pushViewController(whatsInThisViewController!, animated: true)
                    
                    break
                }
            }
        }

        //self.highlightView.frame = highlightViewRect
        //self.view.bringSubviewToFront(self.highlightView)
    }
}

